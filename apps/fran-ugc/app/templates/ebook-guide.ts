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
        >📚 Seu Guia Gratuito está Pronto!</h1>
      </div>

      <!-- Content -->
      <div style='padding: 40px 30px;'>
        <h2 style='color: #914326; margin-top: 0; font-size: 24px;'>Olá, {{name}}!</h2>

        <p
          style='color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;'
        >
          Analisando seu perfil, você se encaixa muito bem no nosso processo! 🎉
        </p>

        <p
          style='color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;'
        >
          Estamos muito felizes que você tenha passado por aqui e respondido essas questões. Você se encaixa super bem no que buscamos!
        </p>

        <p
          style='color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;'
        >
          Aqui está o e-book completo que vai te ensinar como transformar seu celular em uma fonte de renda criando vídeos UGC. Você vai aprender desde o básico até como enviar seus vídeos para marcas e começar a ganhar dinheiro.
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
          style='color: #999; font-size: 14px; line-height: 1.5; margin-top: 30px;'
        >
          Se o botão não funcionar, você pode copiar e colar este link no seu navegador:<br />
          <a
            href='{{ebookLink}}'
            style='color: #c75d3b; word-break: break-all;'
          >{{ebookLink}}</a>
        </p>

        <p
          style='color: #666; font-size: 14px; line-height: 1.6; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;'
        >
          <strong>Dica:</strong> Após baixar o guia, não esqueça de praticar! O sucesso vem com a prática constante. 😊
        </p>
      </div>

      <!-- Footer -->
      <div
        style='background-color: #fbf8f4; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;'
      >
        <p style='color: #666; font-size: 14px; margin: 0;'>
          Obrigada por confiar em nós!<br />
          Se tiver alguma dúvida, entre em contato conosco.
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
