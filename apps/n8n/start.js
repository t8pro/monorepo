// start.js
import { spawn } from 'child_process';

// Variáveis de ambiente necessárias
process.env.N8N_HOST = process.env.N8N_HOST || '0.0.0.0';
process.env.N8N_PORT = process.env.N8N_PORT || '8080';
process.env.N8N_PROTOCOL = process.env.N8N_PROTOCOL || 'https';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Se não tiver encriptação, gera uma
if (!process.env.N8N_ENCRYPTION_KEY) {
  console.warn('⚠️  N8N_ENCRYPTION_KEY não definida. Usando valor temporário.');
  process.env.N8N_ENCRYPTION_KEY = 'temporary-key-change-in-production';
}

// Iniciar N8N
const child = spawn('npx', ['n8n'], {
  stdio: 'inherit',
  env: process.env,
});

child.on('error', err => {
  console.error('Erro ao iniciar N8N:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM recebido. Encerrando gracefully...');
  child.kill();
});
