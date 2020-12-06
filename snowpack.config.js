/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  devOptions: {
    port: 8888
  },
  mount: {
    public: '/',
    src: '/_dist_'
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-webpack'
  ]
};