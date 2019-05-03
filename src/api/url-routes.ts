import * as Joi from 'joi';
import { ServerRoute, Request, ResponseToolkit } from 'hapi';

import Url from "../models/Url";
import shortenUrl from '../utils/shorten-url-util';

const UrlRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/api/v1/url/{id}',
        handler: async (req: Request, res: ResponseToolkit) => {            
            try {
                let url = await Url.findById(req.params.id);
                return res.response(JSON.stringify(url));
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    },
    {
        method: 'GET',
        path: '/api/v1/url/findTop',     
        handler: async (req: Request, res: ResponseToolkit) => {            
            try {
                console.log(req.payload);
                let url = await Url.find();                
                return res.response(url);
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/v1/url/shorten',        
        options: {
            validate: {
                payload: {
                    url: Joi.string().required() && Joi.string().uri(),
                }
            }
        },
        handler: async (req: Request, res: ResponseToolkit) => {
            const payload: any = req.payload;
            try {   
                let urlFound = await Url.findOneAndUpdate({url: payload.url}, { $inc: {visits: 1}});
                if (urlFound) {
                    console.log('entry found');
                    return res.response(urlFound)
                    .code(200)
                } else {
                    console.log('Entry not found in db, saving new')
                    const { 
                        url
                    } = payload;
                    
                    console.log('url: ', url);
                    const shortUrl = shortenUrl(url);
                    let urlModel = new Url({
                        url,
                        shortUrl
                    }); 
                    
                    const response = await urlModel.save().catch(err => console.error(err));
                    return res.response(JSON.stringify(response));
                }                    
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    }
];

export default UrlRoutes;