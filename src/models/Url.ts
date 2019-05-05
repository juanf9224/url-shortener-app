import { Schema, connection } from 'mongoose';
import * as autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(connection);

const UrlSchema: Schema = new Schema({
    url: { type: String },
    title: { type: String },
    created_at: {type: Date},
    shortUrl: { type: String },
    visits: { type: Number }
});

UrlSchema.plugin(autoIncrement.plugin, 'Url');

export default connection.model('Url', UrlSchema);