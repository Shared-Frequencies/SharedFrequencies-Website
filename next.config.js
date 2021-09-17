module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  generateBuildId: async () => {
    const { v4: uuidv4 } = require('uuid');

    // You can, for example, get the latest git commit hash here
    return  uuidv4();
  }
}
