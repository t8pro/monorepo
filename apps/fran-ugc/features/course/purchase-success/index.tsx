'use client';

import { Button, Card, Text, View } from 'reshaped';
import styles from './styles.module.scss';

export const PurchaseSuccess = () => {
  return (
    <div className={styles.container}>
      <View gap={6} align="center" maxWidth="800px">
        <View.Item>
          <span
            className="material-symbols-rounded"
            style={{ fontSize: '80px', color: '#22c55e' }}
          >
            check_circle
          </span>
        </View.Item>

        <View.Item>
          <View gap={3} align="center">
            <View.Item>
              <Text variant="featured-1" weight="bold" align="center">
                Parabéns pela sua compra!
              </Text>
            </View.Item>
            <View.Item>
              <Text variant="body-1" align="center" color="neutral-faded">
                Bem-vindo ao UGC na Prática. Estamos muito felizes em ter você
                conosco nessa jornada!
              </Text>
            </View.Item>
          </View>
        </View.Item>

        <View.Item>
          <Card padding={6}>
            <View gap={5}>
              <View.Item>
                <View gap={2}>
                  <View.Item>
                    <View direction="row" gap={2} align="center">
                      <View.Item>
                        <span
                          className="material-symbols-rounded"
                          style={{ fontSize: '24px', color: '#3b82f6' }}
                        >
                          mail
                        </span>
                      </View.Item>
                      <View.Item>
                        <Text variant="body-1" weight="bold">
                          Próximos passos
                        </Text>
                      </View.Item>
                    </View>
                  </View.Item>
                  <View.Item>
                    <Text variant="body-2" color="neutral-faded">
                      <strong>1. Verifique seu e-mail</strong>
                      <br />
                      Em alguns minutos você receberá um e-mail com suas
                      credenciais de acesso à plataforma. Não esqueça de
                      verificar a caixa de spam!
                    </Text>
                  </View.Item>
                  <View.Item>
                    <Text variant="body-2" color="neutral-faded">
                      <strong>2. Acesse a plataforma</strong>
                      <br />
                      Use o login e senha enviados por e-mail para acessar todo
                      o conteúdo do curso.
                    </Text>
                  </View.Item>
                  <View.Item>
                    <Text variant="body-2" color="neutral-faded">
                      <strong>3. Entre no grupo do WhatsApp</strong>
                      <br />
                      Faça parte da nossa comunidade exclusiva de alunos. É lá
                      que você poderá tirar dúvidas, compartilhar resultados e
                      fazer networking com outros criadores de conteúdo UGC.
                    </Text>
                  </View.Item>
                </View>
              </View.Item>
            </View>
          </Card>
        </View.Item>

        <View.Item>
          <Card padding={5}>
            <View gap={3}>
              <View.Item>
                <View direction="row" gap={2} align="center">
                  <View.Item>
                    <span
                      className="material-symbols-rounded"
                      style={{ fontSize: '24px' }}
                    >
                      info
                    </span>
                  </View.Item>
                  <View.Item>
                    <Text variant="body-1" weight="bold">
                      Informações importantes
                    </Text>
                  </View.Item>
                </View>
              </View.Item>
              <View.Item>
                <View gap={2}>
                  <View.Item>
                    <Text variant="body-3">
                      • <strong>Acesso vitalício:</strong> O curso ficará
                      disponível para você para sempre
                    </Text>
                  </View.Item>
                  <View.Item>
                    <Text variant="body-3">
                      • <strong>Atualizações:</strong> Você terá acesso a todas
                      as atualizações futuras do curso sem custo adicional
                    </Text>
                  </View.Item>
                </View>
              </View.Item>
            </View>
          </Card>
        </View.Item>

        <View.Item>
          <View gap={3} align="center">
            <View.Item>
              <Text variant="body-2" color="neutral-faded" align="center">
                Não recebeu o e-mail? Entre em contato conosco através do
                WhatsApp
              </Text>
            </View.Item>
            <View.Item>
              <Button variant="outline" color="neutral" href="/">
                <View direction="row" gap={2} align="center">
                  <View.Item>
                    <span className="material-symbols-rounded">arrow_back</span>
                  </View.Item>
                  <View.Item>Voltar para a página inicial</View.Item>
                </View>
              </Button>
            </View.Item>
          </View>
        </View.Item>
      </View>
    </div>
  );
};
