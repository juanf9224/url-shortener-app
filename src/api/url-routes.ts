import * as Joi from 'joi';
import { ServerRoute, Request, ResponseToolkit } from 'hapi';

import Url from "../models/Url";
import shortenUrl from '../utils/shorten-url-util';

const UrlRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/api/v1/url/{shortUrl}',
        options:{
            cors: true,
        },        
        handler: async (req: Request, res: ResponseToolkit) => {            
            try {
                console.log(req.params);
                let url: any = await Url.findOne({shortUrl: req.params.shortUrl});
                return res.redirect(url.url);
            } catch (error) {
                console.log(error);
                return res.response(error).code(500);
            }
        }
    },
    {
        method: 'GET',
        path: '/api/v1/url/visit/{shortUrl}',
        options:{
            cors: true,
        },        
        handler: async (req: Request, res: ResponseToolkit) => {            
            try {
                console.log(req.params);
                let url: any = await Url.findOneAndUpdate({shortUrl: req.params.shortUrl}, {$inc: {visit: 1}});
                return res.response(url).code(200);
            } catch (error) {
                console.log(error);
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
                let url = await Url.find().sort({visits: -1}).limit(100);                
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
            },
            cors: true
        },
        handler: async (req: Request, res: ResponseToolkit) => {
            const payload: any = req.payload;
            try {   
                let urlFound = await Url.findOne({url: payload.url});
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
                    const date = new Date();
                    let urlModel = new Url({
                        url,
                        shortUrl,
                        date
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