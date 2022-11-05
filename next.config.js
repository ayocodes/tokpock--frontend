// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   experimental: { esmExternals: true },
// }

// module.exports = nextConfig

const withTM = require("next-transpile-modules")(["beaker-ts"]); // pass the modules you would like to see transpiled

module.exports = withTM({
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },
});
