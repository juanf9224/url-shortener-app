import mongoose from 'mongoose';

const user = process.env.DB_REMOTE_USER || 'admin';
const pwd = process.env.DB_REMOTE_PWD || 'admin';
const db = process.env.DB_REMOTE || 'test?retryWrites=true';
const url = process.env.DB_REMOTE_URL || '@powerfull-api-mongodb-cluster-gbmsd.mongodb.net/';
const connectionString = `mongodb+srv://${user}:${pwd}${url}${db}`;
const connectionStringLocal = process.env.DB_CONNECTION_STRING || ''; //'mongodb://localhost:27017/bluecoding';
const ConnectionUtil = {
    mongooseConnect: () => mongoose.connect(connectionStringLocal, 
        { 
            useNewUrlParser: true, 
            reconnectTries: Number.MAX_VALUE 
        }, 
        err => console.error(err)
    ),
    mongooseConnection: () => mongoose.connection.once('open', () => {
        console.log('Connected to database');
    })
}

export default ConnectionUtil;