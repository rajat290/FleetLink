module.exports = {
  apps: [
    {
      name: "fleetlink-backend",
      script: "server.js",
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
};
