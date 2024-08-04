module.exports = {
  apps: [
    {
      name: "esHindi-front",
      script: "npm",
      cwd: "./",
      args: "start",
       exec_mode: "fork",
      instances: "1",
      env_production: {
        NODE_ENV: "production",
        APP_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development",
        APP_ENV: "development"
      },
      env_dev_production: {
        NODE_ENV: "production",
        APP_ENV: "dev_production"
      }
    }
  ]
}