module.exports = {
  apps: [
    {
      name: 'periodium',
      exec_mode: 'cluster',
      script: './server/index.js',
      instances: 0,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      node_args: '--max_old_space_size=2560',
      env_production: {
        HOST: '127.0.0.1',
        NPM_CONFIG_PRODUCTION: true,
        NODE_ENV: 'production',
        DATABASE_URL: 'mysql://user:123456@localhost:3306/periodum',
        MIN_POOL_SIZE: 5,
        MAX_POOL_SIZE: 15,
      },
    },
  ],
}
