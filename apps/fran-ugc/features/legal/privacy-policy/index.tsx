'use client';

import Link from 'next/link';
import { Text, View } from 'reshaped';
import styles from './styles.module.scss';

export const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <View gap={6} maxWidth="900px">
        <View.Item>
          <View gap={3}>
            <View.Item>
              <Text variant="featured-1" weight="bold">
                Política de Privacidade e LGPD
              </Text>
            </View.Item>
            <View.Item>
              <Text variant="body-2" color="neutral-faded">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </Text>
            </View.Item>
          </View>
        </View.Item>

        <View.Item>
          <View gap={4}>
            <View.Item>
              <View gap={2}>
                <View.Item>
                  <Text variant="body-1" weight="bold">
                    1. Introdução
                  </Text>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    Esta Política de Privacidade descreve como coletamos,
                    usamos, armazenamos e protegemos suas informações pessoais,
                    em conformidade com a Lei Geral de Proteção de Dados (LGPD -
                    Lei nº 13.709/2018).
                  </Text>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    Ao utilizar nosso site e serviços, você concorda com a
                    coleta e uso de informações de acordo com esta política.
                  </Text>
                </View.Item>
              </View>
            </View.Item>

            <View.Item>
              <View gap={2}>
                <View.Item>
                  <Text variant="body-1" weight="bold">
                    2. Informações que Coletamos
                  </Text>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    Coletamos as seguintes informações pessoais quando você se
                    cadastra em nosso site ou adquire nossos produtos:
                  </Text>
                </View.Item>
                <View.Item>
                  <View gap={1}>
                    <View.Item>
                      <Text variant="body-2">• Nome completo</Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">• Endereço de e-mail</Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • Número de telefone/WhatsApp
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • Informações de pagamento (processadas por parceiros
                        seguros)
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • Dados de navegação e uso da plataforma
                      </Text>
                    </View.Item>
                  </View>
                </View.Item>
              </View>
            </View.Item>

            <View.Item>
              <View gap={2}>
                <View.Item>
                  <Text variant="body-1" weight="bold">
                    3. Como Utilizamos suas Informações
                  </Text>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    Utilizamos suas informações pessoais para:
                  </Text>
                </View.Item>
                <View.Item>
                  <View gap={1}>
                    <View.Item>
                      <Text variant="body-2">
                        • Fornecer acesso ao curso e materiais educacionais
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • Processar pagamentos e emitir notas fiscais
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • Enviar comunicações importantes sobre o curso
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • Prestar suporte e atendimento ao cliente
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • Melhorar nossos serviços e experiência do usuário
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • Enviar materiais gratuitos (e-books, guias) quando
                        solicitado
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • Enviar comunicações de marketing (com seu
                        consentimento)
                      </Text>
                    </View.Item>
                  </View>
                </View.Item>
              </View>
            </View.Item>

            <View.Item>
              <View gap={2}>
                <View.Item>
                  <Text variant="body-1" weight="bold">
                    4. Base Legal para Tratamento de Dados
                  </Text>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    O tratamento de seus dados pessoais é realizado com base nas
                    seguintes hipóteses legais:
                  </Text>
                </View.Item>
                <View.Item>
                  <View gap={1}>
                    <View.Item>
                      <Text variant="body-2">
                        • <strong>Execução de contrato:</strong> para fornecer
                        acesso ao curso adquirido
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • <strong>Consentimento:</strong> para envio de
                        materiais gratuitos e comunicações de marketing
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • <strong>Legítimo interesse:</strong> para melhorar
                        nossos serviços e garantir a segurança da plataforma
                      </Text>
                    </View.Item>
                  </View>
                </View.Item>
              </View>
            </View.Item>

            <View.Item>
              <View gap={2}>
                <View.Item>
                  <Text variant="body-1" weight="bold">
                    5. Compartilhamento de Informações
                  </Text>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    Não vendemos suas informações pessoais. Podemos compartilhar
                    seus dados apenas com:
                  </Text>
                </View.Item>
                <View.Item>
                  <View gap={1}>
                    <View.Item>
                      <Text variant="body-2">
                        • Processadores de pagamento (para processar transações)
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • Provedores de hospedagem e infraestrutura
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • Ferramentas de e-mail marketing (com seu
                        consentimento)
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • Autoridades legais, quando exigido por lei
                      </Text>
                    </View.Item>
                  </View>
                </View.Item>
              </View>
            </View.Item>

            <View.Item>
              <View gap={2}>
                <View.Item>
                  <Text variant="body-1" weight="bold">
                    6. Armazenamento e Segurança
                  </Text>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    Implementamos medidas de segurança técnicas e
                    organizacionais para proteger suas informações pessoais
                    contra acesso não autorizado, perda, destruição ou
                    alteração.
                  </Text>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    Seus dados são armazenados em servidores seguros e mantidos
                    pelo período necessário para cumprir as finalidades
                    descritas nesta política ou conforme exigido por lei.
                  </Text>
                </View.Item>
              </View>
            </View.Item>

            <View.Item>
              <View gap={2}>
                <View.Item>
                  <Text variant="body-1" weight="bold">
                    7. Seus Direitos (LGPD)
                  </Text>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    De acordo com a LGPD, você tem os seguintes direitos em
                    relação aos seus dados pessoais:
                  </Text>
                </View.Item>
                <View.Item>
                  <View gap={1}>
                    <View.Item>
                      <Text variant="body-2">
                        • <strong>Confirmação e acesso:</strong> confirmar se
                        tratamos seus dados e solicitar acesso a eles
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • <strong>Correção:</strong> solicitar a correção de
                        dados incompletos ou desatualizados
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • <strong>Anonimização ou eliminação:</strong> solicitar
                        a anonimização ou eliminação de dados desnecessários
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • <strong>Portabilidade:</strong> solicitar a
                        portabilidade de seus dados para outro fornecedor
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • <strong>Revogação do consentimento:</strong> retirar
                        seu consentimento a qualquer momento
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        • <strong>Oposição:</strong> opor-se ao tratamento de
                        dados em determinadas situações
                      </Text>
                    </View.Item>
                  </View>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    Para exercer seus direitos, entre em contato conosco através
                    dos canais informados no final desta política.
                  </Text>
                </View.Item>
              </View>
            </View.Item>

            <View.Item>
              <View gap={2}>
                <View.Item>
                  <Text variant="body-1" weight="bold">
                    8. Cookies e Tecnologias Similares
                  </Text>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    Utilizamos cookies e tecnologias similares para melhorar sua
                    experiência em nosso site, analisar o tráfego e personalizar
                    conteúdo. Você pode gerenciar suas preferências de cookies
                    nas configurações do seu navegador.
                  </Text>
                </View.Item>
              </View>
            </View.Item>

            <View.Item>
              <View gap={2}>
                <View.Item>
                  <Text variant="body-1" weight="bold">
                    9. Alterações nesta Política
                  </Text>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    Podemos atualizar esta Política de Privacidade
                    periodicamente. Notificaremos você sobre quaisquer mudanças
                    significativas por e-mail ou através de um aviso em nosso
                    site.
                  </Text>
                </View.Item>
              </View>
            </View.Item>

            <View.Item>
              <View gap={2}>
                <View.Item>
                  <Text variant="body-1" weight="bold">
                    10. Contato
                  </Text>
                </View.Item>
                <View.Item>
                  <Text variant="body-2">
                    Se você tiver dúvidas sobre esta Política de Privacidade ou
                    desejar exercer seus direitos, entre em contato conosco:
                  </Text>
                </View.Item>
                <View.Item>
                  <View gap={1}>
                    <View.Item>
                      <Text variant="body-2">
                        <strong>E-mail:</strong> contato@francieliazevedo.com
                      </Text>
                    </View.Item>
                    <View.Item>
                      <Text variant="body-2">
                        <strong>WhatsApp:</strong>{' '}
                        <Link
                          href="https://wa.me/+5567998777776"
                          target="_blank"
                        >
                          +55 67 99877-7776
                        </Link>
                      </Text>
                    </View.Item>
                  </View>
                </View.Item>
              </View>
            </View.Item>
          </View>
        </View.Item>
      </View>
    </div>
  );
};
