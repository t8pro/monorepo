import nodemailer from 'nodemailer';

type EmailData = {
  name: string;
  email: string;
  domain: string;
};

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

let transporter: nodemailer.Transporter | null = null;

export const getTransporter = () => {
  if (!transporter) {
    if (!emailUser || !emailPass) {
      throw new Error('Email transport is not configured');
    }

    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
  }
  return transporter;
};

export async function sendEmail(
  to: string,
  subject: string,
  template: string,
  data: EmailData,
): Promise<void> {
  const transporterInstance = getTransporter();

  const handlebars = await import('handlebars');

  const compiledTemplate = handlebars.compile<EmailData>(template);
  const html = compiledTemplate(data);

  await transporterInstance.sendMail({
    from: `Retouch Pro <${emailUser}>`,
    to,
    subject,
    html,
  });
}
