const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Obtenha a configuração padrão do Metro
const config = getDefaultConfig(__dirname);

// Inclua os pacotes compartilhados na resolução
config.watchFolders = [
  path.resolve(__dirname, "../../packages/ui"),
  path.resolve(__dirname, "../../packages/utils"),
];

// Permita a resolução de arquivos TypeScript e JSX nos pacotes
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, "ts", "tsx", "jsx", "js"],
};

module.exports = config;
