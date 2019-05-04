import * as hapi from 'hapi';
import ConnectionUtil from './connection/ConnectionUtil';
import ApiRoutes from './api/routes';
import * as dotenv from 'dotenv';

// Server parameters
const server: hapi.Server = new hapi.Server({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
});

const start = async () => { 

    //init evn variables
    dotenv.config();

    // Connect to db
    ConnectionUtil.mongooseConnect();
    ConnectionUtil.mongooseConnection();

    // add api routes
    server.route(ApiRoutes());

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

// if unhandled error occurs, execution will terminate
(process as NodeJS.EventEmitter).on('unHandledRejection', (err: any) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});

start().catch(err => console.error(`Could not start server: ${err}`));