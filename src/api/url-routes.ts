import * as Joi from 'joi';
import { ServerRoute, Request, ResponseToolkit } from 'hapi';

import Url from "../models/Url";
import { shortenUrl, scrappUrl } from '../utils';

const UrlRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/api/v1/url/{shortUrl}',
        options:{
            cors: true,
        },        
        handler: async (req: Request, res: ResponseToolkit) => {            
            try {
                
                // Redirect to specified shortUrl
                let url: any = await Url.findOne({shortUrl: req.params.shortUrl});                
                return res.redirect(url.url)
                .header('content-type', 'text/plain')
                .location(url.url)
                .code(302);

            } catch (error) {
                console.error(error);
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
                // Increment visits counter on visited url from client
                let url: any = await Url.findOneAndUpdate({shortUrl: req.params.shortUrl}, {$inc: {visits: 1}}, {new: true});
                return res.response(url).code(200);
            } catch (error) {
                console.error(error);
                return res.response(error).code(500);
            }
        }
    },
    {
        method: 'GET',
        path: '/api/v1/url/findTop',     
        handler: async (req: Request, res: ResponseToolkit) => {            
            try {
                // Fetch the top 100 visited urls with descending sort 
                let urls: any[] = await Url.find().sort({visits: -1}).limit(100);          
                return res.response(urls).code(200);
            } catch (error) {
                console.error(error);
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

                // If a record with this url exists then return thath one
                if (urlFound) {
                    console.log('entry found');
                    return res.response(urlFound)
                    .code(200)
                } else {
                    // If no record of this url exists then save it 
                    console.log('Entry not found in db, saving new')
                    const { 
                        url
                    } = payload;
                    const date = new Date();
                    
                    // crawl title form url before it is saved
                    let title = await scrappUrl(url).getTitle().catch(() => `Could not get title for this url: ${url}`);
                    title = title ? title: '';
                    let urlModel = new Url({
                        url,
                        title,
                        date
                    }); 
                    
                    let response = await urlModel.save();

                    // Shorten url with the shortenUrl util
                    const shortenedUrl = shortenUrl(`${response._id}`);

                    // Update this url to have newly generated code as shortUrl
                    const updated = await Url.findOneAndUpdate({_id: response._id}, {shortUrl: shortenedUrl}, {new: true});
                    
                    return res.response(JSON.stringify(updated)).code(201);
                }                    
            } catch (error) {
                console.error(error);
                return res.response(error).code(500);
            }
        }
    }
];

export default UrlRoutes;