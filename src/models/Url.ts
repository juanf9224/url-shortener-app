import { Schema, model } from 'mongoose';

const UrlSchema: Schema = new Schema({
    url: String,
    shortUrl: { type: String, unique: true },
    created_at: {type: Date},
    visits: Number
});

export default model('Url', UrlSchema);