// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   experimental: { esmExternals: true },
// }

// module.exports = nextConfig

const withTM = require("next-transpile-modules")(["beaker-ts"]); // pass the modules you would like to see transpiled

module.exports = withTM({});
