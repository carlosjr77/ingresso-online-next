/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para o Webpack ignorar arquivos problemáticos no Windows
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ignored: [
          '**/.git/**',
          '**/node_modules/**',
          '**/*.sys', 
          '**/System Volume Information/**',
          '**/DumpStack.log.tmp'
        ],
      };
    }
    return config;
  },
};

module.exports = nextConfig;