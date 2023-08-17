/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@babel/preset-react",
  "@fullcalendar/core",
  "@fullcalendar/daygrid",
  "@fullcalendar/list",
  "@fullcalendar/react",
]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["alliancecarstg.wpengine.com"],
  },
});
