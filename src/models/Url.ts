import { Schema, model } from 'mongoose';

const UrlSchema: Schema = new Schema({
    url: String,
    shortUrl: String,
    created_at: String,
    visits: Number
});

export default model('Url', UrlSchema);