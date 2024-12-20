module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  generateBuildId: async () => {
    const { v4: uuidv4 } = require('uuid');

    // You can, for example, get the latest git commit hash here
    return  uuidv4();
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-p5': 'react-p5/dist/react-p5.min.js',
    };
    return config;
  },
}
