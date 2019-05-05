import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const user = process.env.DB_REMOTE_USER || 'admin';
const pwd = process.env.DB_REMOTE_PWD || 'admin';
const db = process.env.DB_REMOTE || 'shortener-db?retryWrites=true';
const url = process.env.DB_REMOTE_URL || '@powerfull-api-mongodb-cluster-gbmsd.mongodb.net/';
const connectionString = `mongodb+srv://${user}:${pwd}${url}${db}`;
const connectionStringLocal = process.env.DB_CONNECTION_STRING || '';

const ConnectionUtil = {
    mongooseConnect: () => mongoose.connect(connectionString, 
        { 
            useNewUrlParser: true,
            useFindAndModify: false,
            reconnectTries: Number.MAX_VALUE 
        },
    ),
    mongooseConnection: () => mongoose.connection.once('open', () => {
        console.log('Connected to database');
    })
}

export default ConnectionUtil;