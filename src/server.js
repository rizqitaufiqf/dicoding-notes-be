import * as Hapi from '@hapi/hapi';
import routes from './routes.js';

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server running at ${server.info.uri}`);
};

init();
