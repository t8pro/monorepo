export const ebookGuideTemplate = `
<html>
  <body
    style='font-family: Arial, sans-serif; padding: 20px; background-color: #fbf8f4;'
  >
    <div
      style='max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);'
    >
      <!-- Header -->
      <div
        style='background: linear-gradient(135deg, #914326 0%, #c75d3b 100%); padding: 30px; text-align: center;'
      >
        <h1
          style='color: white; margin: 0; font-size: 28px; font-weight: bold;'
        >📚 Seu Guia Gratuito de UGC!</h1>
      </div>

      <!-- Content -->
      <div style='padding: 40px 30px;'>
        <h2 style='color: #914326; margin-top: 0; font-size: 24px;'>Oi, {{name}}! Tudo bem?</h2>

        <p
          style='color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;'
        >
          Aqui é a Fran! Fico muito feliz que você tenha se interessado pelo mundo do UGC (User Generated Content).
        </p>

        <p
          style='color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;'
        >
          Preparei esse guia especialmente para você dar os primeiros passos e entender como é possível <strong>transformar seu celular em uma fonte de renda</strong> criando vídeos para marcas.
        </p>

        <p
          style='color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;'
        >
          O PDF está em anexo neste e-mail! Você também pode baixar clicando no botão abaixo:
        </p>

        <!-- Download Button -->
        <div style='text-align: center; margin: 30px 0;'>
          <a
            href='{{ebookLink}}'
            style='display: inline-block; background: linear-gradient(135deg, #c75d3b 0%, #914326 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(199, 93, 59, 0.4);'
          >
            📥 Baixar Guia Gratuito
          </a>
        </div>

        <p
          style='color: #666; font-size: 16px; line-height: 1.6; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;'
        >
          Depois de ler o guia, se quiser se aprofundar mais e aprender tudo sobre UGC, me chama! Vou adorar te ajudar nessa jornada.
        </p>

        <!-- Contact Section -->
        <div style='background-color: #fbf8f4; border-radius: 8px; padding: 20px; margin-top: 20px;'>
          <p style='color: #914326; font-size: 16px; font-weight: bold; margin: 0 0 15px 0;'>
            Vamos nos conectar?
          </p>
          <p style='color: #666; font-size: 15px; line-height: 1.8; margin: 0;'>
            <a href='https://instagram.com/byfranazevedo' target='_blank' style='color: #c75d3b; text-decoration: none;'>
              📸 Instagram: @byfranazevedo
            </a>
            <br />
            <a href='https://wa.me/+5567998777776' target='_blank' style='color: #c75d3b; text-decoration: none;'>
              📱 WhatsApp: (67) 99877-7776
            </a>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div
        style='background-color: #fbf8f4; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;'
      >
        <p style='color: #666; font-size: 14px; margin: 0;'>
          Um abraço,<br />
          <strong>Fran Azevedo</strong>
        </p>
      </div>
    </div>
  </body>
</html>
`;

export type EbookGuideTemplateData = {
  name: string;
  email: string;
  ebookLink: string;
};
