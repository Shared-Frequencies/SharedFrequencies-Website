module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
    unoptimized: true
  },
  generateBuildId: async () => {
    const { v4: uuidv4 } = require('uuid');
    return uuidv4();
  }
}
