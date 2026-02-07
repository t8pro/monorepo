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
    name: 'Ingrid Aleixes',
    text: 'Fiz o curso de UGC da Fran Azevedo e preciso compartilhar o quanto essa experiência foi boa pra mim. É um curso leve, gostoso de acompanhar e, ao mesmo tempo, extremamente claro. Não é cansativo, não é enrolado, pelo contrário: a cada aula dá vontade de continuar assistindo. A Fran é muito objetiva e realista, o que faz toda a diferença pra quem está começando. Você entende de verdade o que é, como funciona e, principalmente, como dar os primeiros passos sem confusão. Me senti muito segura e confiante depois desse curso. Recomendo com toda certeza!',
    featured: true,
  },
  {
    name: 'Elaine Lacerda',
    text: 'A mentoria foi maravilhosa! Após a maternidade, eu precisava de uma oportunidade para trabalhar em casa e o UGC foi a resposta que eu tanto pedia. O material é muito claro e o suporte no WhatsApp é excelente. Sou muito grata por todo o cuidado e dedicação!',
  },
  {
    name: 'Maria Fernanda',
    text: 'Desde o início da minha jornada no UGC, a Fran teve um papel fundamental. Antes da mentoria eu não tinha clareza, mas agora entendo perfeitamente como o mercado funciona, como abordar marcas e como me posicionar. Sou muito grata por todo o apoio!',
  },
  {
    name: 'Zilmara Santos',
    text: 'Sempre admirei o trabalho da Fran e entrei na mentoria assim que abriu! O suporte é excelente, ajudando com roteiros e tirando dúvidas na hora. Consigo conciliar tudo com meu trabalho e estudos, e sinto que estou evoluindo e me sentindo muito mais segura a cada vídeo!',
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className={styles.root}>
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
          {TEXT_TESTIMONIALS.filter(t => t.featured).map(
            (testimonial, index) => (
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
            ),
          )}

          <div className={styles.grid}>
            {TEXT_TESTIMONIALS.filter(t => !t.featured).map(
              (testimonial, index) => (
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
              ),
            )}
          </div>
        </div>

        <div className={styles.ctaWrapper}>
          <Link
            data-gtm-category="conversion"
            data-gtm-label="testimonials_cta_pricing"
            href="https://pay.kiwify.com.br/offEio7"
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
