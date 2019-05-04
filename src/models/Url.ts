import { Schema, model, connection, Document } from 'mongoose';
import * as autoIncrement from 'mongoose-auto-increment';
import shortenUrl from '../utils/shorten-url-util';

autoIncrement.initialize(connection);

const UrlSchema: Schema = new Schema({
    url: { type: String },
    shortUrl: { type: String },
    created_at: {type: Date},
    visits: { type: Number }
});

UrlSchema.plugin(autoIncrement.plugin, {
    model: 'Url',
    startAt: 5000
});

// UrlSchema.post('save', (doc: Document) => {
//     console.log('post update', shortenUrl(`${doc._id}`));
//     doc.updateOne({_id: doc._id}, {shortUrl: shortenUrl(`${doc._id}`)});
// });

export default model('Url', UrlSchema);