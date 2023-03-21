/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    BaseUrl: process.env.M_HOSTNAME,
    OptionalUrl: process.env.G_HOSTNAME,
    Hostname: process.env.HOSTNAME,
  },
};
