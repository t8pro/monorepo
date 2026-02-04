'use client';
import Link from 'next/link';
import { Button } from 'reshaped';
import { AudioPlayer } from './audio-player';
import styles from './styles.module.scss';
const AUDIOS = [
  { name: 'Elaine Lacerda', src: '/audios/Elaine Lacerda.opus' },
  { name: 'Maria Fernanda', src: '/audios/Maria Fernanda.opus' },
  { name: 'Zilmara Santos', src: '/audios/Zilmara Santos.opus' },
];

const TEXT_TESTIMONIALS = [
  {
    name: 'Elaine Lacerda',
    text: 'O UGC na Prática me mostrou que eu não preciso ser famosa pra ganhar dinheiro. Em 3 semanas fechei contrato com uma loja de maquiagem. Estou amando!',
  },
  {
    name: 'Maria Fernanda',
    text: 'Gente, a didática da Fran é perfeita! Eu tinha zero experiência e já fiz vídeos que as marcas amaram. Liberdade de verdade é trabalhar de casa assim.',
  },
  {
    name: 'Zilmara Santos',
    text: 'Melhor investimento que fiz! O passo a passo é muito claro. Já recuperei o valor do curso no primeiro trabalho que fechei. Recomendo demais!',
  },
  {
    name: 'Juliana Mendes',
    text: 'Eu tinha medo de aparecer, mas o método me deixou super segura. Hoje faço vídeos com naturalidade e sou paga por isso. Gratidão eterna!',
  },
  {
    name: 'Camila Rocha',
    text: 'Sempre achei que precisava de equipamentos caros, mas comecei só com o celular como a Fran ensina e deu super certo. O mercado de UGC é gigante!',
  },
  {
    name: 'Beatriz Souza',
    text: 'Estou vivendo 100% de UGC agora. O curso me ensinou não só a gravar, mas negociar com as marcas. É uma virada de chave na vida financeira.',
  },
];

export const Testimonials = () => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}>
          <span>Depoimentos Reais</span>
        </div>

        <div className={styles.splitContent}>
          <div className={styles.column}>
            {AUDIOS.map((audio, index) => (
              <div
                key={index}
                style={{
                  maxWidth: '100%',
                  alignSelf: 'flex-start',
                  width: '100%',
                }}
              >
                <AudioPlayer name={audio.name} src={audio.src} />
              </div>
            ))}
          </div>

          <div className={styles.column}>
            <div className={styles.descriptionWrapper}>
              <h3 className={styles.descriptionTitle}>
                Resultados que <strong>falam por si</strong>
              </h3>
              <p className={styles.descriptionText}>
                Nossas alunas comprovam: não é preciso ter milhares de
                seguidores ou equipamentos caros para começar. Com o método UGC
                na Prática, você aprende o caminho exato para fechar parcerias e
                ser remunerada pelos seus vídeos.
                <br />
                <br />
                Dê o play e ouça a experiência de quem já está no mercado
                faturando com o celular.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.printsSection}>
          <div className={styles.grid}>
            {TEXT_TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardAvatar}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <span className={styles.cardName}>{testimonial.name}</span>
                </div>
                <p className={styles.cardText}>
                  &quot;{testimonial.text}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaWrapper}>
          <Link
            href="#pricing"
            onClick={e => {
              e.preventDefault();
              const element = document.getElementById('pricing');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '#pricing');
              }
            }}
          >
            <Button size="large" variant="solid" className={styles.ctaButton}>
              <strong>Quero ter esses resultados</strong>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
