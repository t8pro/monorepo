'use client';

import styles from './styles.module.scss';

const modules = [
  {
    title: 'Introdução',
    description:
      'Boas vindas e apresentação pessoal para começar sua jornada no UGC.',
    lessons: ['Boas vindas', 'Resumo sobre mim'],
  },
  {
    title: 'Mentalidade de criadora profissional',
    description:
      'Desenvolva a confiança e postura profissional necessárias para ter sucesso como criadora de conteúdo.',
    lessons: [
      'Como vencer a vergonha, insegurança e comparação',
      'Construindo uma postura profissional',
    ],
  },
  {
    title: 'Fundamentos do UGC',
    description:
      'Entenda a diferença entre influencer e UGC e os conceitos fundamentais do mercado.',
    lessons: ['Diferença entre influencer e UGC'],
  },
  {
    title: 'Montando seu portfolio',
    description:
      'Aprenda a criar um portfólio profissional que atraia marcas e demonstre seu potencial.',
    lessons: [
      'O que é Portfólio',
      'Estrutura de um portfolio',
      'Como definir seu nicho e dicas para um bom conteúdo',
      'Conteúdo do seu portfólio',
      'Criando seu portfólio no Canva',
    ],
  },
  {
    title: 'Precificação',
    description:
      'Aprenda a precificar seu trabalho de forma justa e profissional.',
    lessons: ['Como precificar'],
  },
  {
    title: 'Gravação e produção de conteúdo',
    description:
      'Domine as técnicas de gravação, roteiro e produção para criar vídeos de alta qualidade.',
    lessons: [
      'Dicas de cenário',
      'Roteiro: Introdução',
      'Roteiro: Conteúdo',
      'Posicionamento',
      'Gravação na prática',
    ],
  },
  {
    title: 'Prospecção',
    description:
      'Estratégias para encontrar e abordar marcas de forma profissional.',
    lessons: ['Abordando as marcas'],
  },
  {
    title: 'Edição',
    description:
      'Aprenda a editar seus vídeos diretamente no celular e como enviar o conteúdo finalizado.',
    lessons: ['Editando com seu celular', 'Como enviar seu conteúdo'],
  },
  {
    title: 'Conclusão',
    description: 'Encerramento do curso e próximos passos na sua jornada.',
    lessons: ['Aula final'],
  },
];

export const Modules = () => {
  return (
    <div className={styles.modules} id="modules">
      <div className={styles.content}>
        <h2 className={styles.title}>Conteúdo do curso</h2>

        {modules.map((module, index) => (
          <div key={index} className={styles.module}>
            <div className={styles.moduleNumber}>{index + 1}</div>
            <div className={styles.moduleContent}>
              <h3 className={styles.moduleTitle}>{module.title}</h3>
              <p className={styles.moduleDescription}>{module.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
