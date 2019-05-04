import * as hapi from 'hapi';
import ConnectionUtil from './connection/ConnectionUtil';
import ApiRoutes from './api/routes';

import * as dotenv from 'dotenv';

dotenv.config();

// Server parameters
const server: hapi.Server = new hapi.Server({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
});

// Connect to db
ConnectionUtil.mongooseConnect();
ConnectionUtil.mongooseConnection();

const start = async () => {
    server.route(ApiRoutes());

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

(process as NodeJS.EventEmitter).on('unHandledRejection', (err: any) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});

start().catch(err => console.error(`Could not start server: ${err}`));