'use client';

import { Controller } from 'react-hook-form';
import {
  Text,
  TextField,
  Button,
  Container,
  View,
  FormControl,
  Checkbox,
} from 'reshaped';
import { withMask } from 'use-mask-input';
import { PRODUCT_AFFINITIES } from './constants';
import { useLeadForm } from './hook';
import styles from './styles.module.scss';

export default function LeadForm() {
  const {
    control,
    handleSubmit,
    productAffinity,
    toggleProductAffinity,
    handleScrollToNext,
    isSubmitting,
    errors,
    refs: {
      question1Ref,
      question2Ref,
      question3Ref,
      productAffinityRef,
      nameRef,
      emailRef,
    },
  } = useLeadForm();

  return (
    <section className={styles.leadPage}>
      <Container>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.header}>
            <h1 className={styles.title}>Me conte um pouco sobre você</h1>
            <p className={styles.subtitle}>
              Com essas informações você pode receber uma proposta personalizada
              nossa
            </p>
          </div>

          <div className={styles.questionsSection}>
            <div ref={question1Ref} className={styles.questionGroup}>
              <h2 className={styles.question}>
                Você está desempregada(o) ou procurando fazer renda sem sair de
                casa?
              </h2>
              <div className={styles.yesNoButtons}>
                <Controller
                  name="unemployedOrSeekingIncome"
                  control={control}
                  render={({ field }) => (
                    <div className={styles.buttonGroup}>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'sim' ? styles.active : ''}`}
                        onClick={() => {
                          field.onChange('sim');
                          handleScrollToNext(1);
                        }}
                      >
                        Sim
                      </button>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'nao' ? styles.active : ''}`}
                        onClick={() => {
                          field.onChange('nao');
                          handleScrollToNext(1);
                        }}
                      >
                        Não
                      </button>
                    </div>
                  )}
                />
                {errors.unemployedOrSeekingIncome && (
                  <Text
                    variant="caption-1"
                    color="critical"
                    className={styles.error}
                  >
                    {errors.unemployedOrSeekingIncome.message}
                  </Text>
                )}
              </div>
            </div>

            <div ref={question2Ref} className={styles.questionGroup}>
              <h2 className={styles.question}>
                Você gosta de aparecer em vídeos para internet?
              </h2>
              <div className={styles.yesNoButtons}>
                <Controller
                  name="likesAppearingInVideos"
                  control={control}
                  render={({ field }) => (
                    <div className={styles.buttonGroup}>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'sim' ? styles.active : ''}`}
                        onClick={() => {
                          field.onChange('sim');
                          handleScrollToNext(2);
                        }}
                      >
                        Sim
                      </button>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'nao' ? styles.active : ''}`}
                        onClick={() => {
                          field.onChange('nao');
                          handleScrollToNext(2);
                        }}
                      >
                        Não
                      </button>
                    </div>
                  )}
                />
                {errors.likesAppearingInVideos && (
                  <Text
                    variant="caption-1"
                    color="critical"
                    className={styles.error}
                  >
                    {errors.likesAppearingInVideos.message}
                  </Text>
                )}
              </div>
            </div>

            <div ref={question3Ref} className={styles.questionGroup}>
              <h2 className={styles.question}>
                Você gostaria de receber um guia que te ensina a fazer um
                criativo como exemplo.
              </h2>
              <p className={styles.questionDescription}>
                Após gravar, você me encaminha o material que eu vou avaliar e
                te responder se está no caminho certo! 😍 E pode ficar tranquila
                que eu vou te passar exatamente o roteiro que você vai fazer.
                Está no meu Guia.
              </p>
              <div className={styles.yesNoButtons}>
                <Controller
                  name="wantsCreativeGuide"
                  control={control}
                  render={({ field }) => (
                    <div className={styles.buttonGroup}>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'sim' ? styles.active : ''}`}
                        onClick={() => {
                          field.onChange('sim');
                          handleScrollToNext(3);
                        }}
                      >
                        Sim
                      </button>
                      <button
                        type="button"
                        className={`${styles.yesNoButton} ${field.value === 'nao' ? styles.active : ''}`}
                        onClick={() => {
                          field.onChange('nao');
                          handleScrollToNext(3);
                        }}
                      >
                        Não
                      </button>
                    </div>
                  )}
                />
                {errors.wantsCreativeGuide && (
                  <Text
                    variant="caption-1"
                    color="critical"
                    className={styles.error}
                  >
                    {errors.wantsCreativeGuide.message}
                  </Text>
                )}
              </div>
            </div>
          </div>

          <div
            ref={productAffinityRef}
            className={styles.productAffinitySection}
          >
            <h2 className={styles.sectionTitle}>
              Quais são os produtos que você tem mais afinidade?
            </h2>
            <div className={styles.productButtons}>
              {PRODUCT_AFFINITIES.map(product => (
                <button
                  key={product.value}
                  type="button"
                  className={`${styles.productButton} ${productAffinity.includes(product.value) ? styles.active : ''}`}
                  onClick={() => toggleProductAffinity(product.value)}
                >
                  {product.label}
                </button>
              ))}
            </div>
            {errors.productAffinity && (
              <Text
                variant="caption-1"
                color="critical"
                className={styles.error}
              >
                {errors.productAffinity.message}
              </Text>
            )}
          </div>

          <div className={styles.infoSection}>
            <h2 className={styles.sectionTitle}>Suas informações</h2>
            <View direction="row" gap={4}>
              <View.Item columns={6}>
                <div ref={nameRef}>
                  <FormControl hasError={!!errors.name}>
                    <FormControl.Label>Nome</FormControl.Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="large"
                          name="name"
                          value={field.value || ''}
                          onChange={({ value }) => field.onChange(value)}
                          className={styles.input}
                        />
                      )}
                    />
                    {errors.name && (
                      <FormControl.Error>
                        {errors.name.message}
                      </FormControl.Error>
                    )}
                  </FormControl>
                </div>
              </View.Item>

              <View.Item columns={6}>
                <FormControl hasError={!!errors.phone}>
                  <FormControl.Label>Telefone</FormControl.Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="large"
                        name="phone"
                        value={field.value || ''}
                        onChange={({ value }) => field.onChange(value)}
                        placeholder="(99) 9 9999-9999"
                        inputAttributes={{
                          type: 'tel',
                          ref: withMask('(99) 9 9999-9999'),
                        }}
                        className={styles.input}
                      />
                    )}
                  />
                  {errors.phone && (
                    <FormControl.Error>
                      {errors.phone.message}
                    </FormControl.Error>
                  )}
                </FormControl>
              </View.Item>

              <View.Item columns={6}>
                <div ref={emailRef}>
                  <FormControl hasError={!!errors.email}>
                    <FormControl.Label>E-mail</FormControl.Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="large"
                          name="email"
                          value={field.value || ''}
                          onChange={({ value }) => field.onChange(value)}
                          inputAttributes={{ type: 'email' }}
                          placeholder="example@gmail.com"
                          className={styles.input}
                        />
                      )}
                    />
                    {errors.email && (
                      <FormControl.Error>
                        {errors.email.message}
                      </FormControl.Error>
                    )}
                  </FormControl>
                </div>
              </View.Item>

              <View.Item columns={6}>
                <FormControl hasError={!!errors.instagram}>
                  <FormControl.Label>@ do instagram</FormControl.Label>
                  <Controller
                    name="instagram"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="large"
                        name="instagram"
                        value={field.value || ''}
                        onChange={({ value }) => field.onChange(value)}
                        className={styles.input}
                      />
                    )}
                  />
                  {errors.instagram && (
                    <FormControl.Error>
                      {errors.instagram.message}
                    </FormControl.Error>
                  )}
                </FormControl>
              </View.Item>
            </View>
          </div>

          <div className={styles.consentSection}>
            <FormControl hasError={!!errors.dataConsent} group>
              <Controller
                name="dataConsent"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    name="dataConsent"
                    checked={field.value || false}
                    onChange={({ event }) => {
                      if (event) {
                        field.onChange(event.target.checked);
                      }
                    }}
                  >
                    <span>
                      Aceito compartilhar meus dados conforme a{' '}
                      <a
                        href="/politica-de-privacidade"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.consentLink}
                      >
                        Política de Privacidade
                      </a>{' '}
                      e a{' '}
                      <a
                        href="/termos-de-uso"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.consentLink}
                      >
                        LGPD
                      </a>
                    </span>
                  </Checkbox>
                )}
              />
              {errors.dataConsent && (
                <FormControl.Error>
                  {errors.dataConsent.message}
                </FormControl.Error>
              )}
            </FormControl>
          </div>

          <div className={styles.submitSection}>
            <Button type="submit" size="large" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Baixar Guia Gratuito!'}
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
}
