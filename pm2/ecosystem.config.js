module.exports = {
    apps: [
        {
            name: 'dicoding-notes-be',
            script: './src/server.js',
            watch: true,
            watch_delay: 1000,
            ignore_watch: ['node_modules', '.git', 'docs'],
            env_prod: {
                PORT: 3000,
                NODE_ENV: 'production',
            },
            env_dev: {
                PORT: 3000,
                NODE_ENV: 'development',
            },
        },
    ],
};
