import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

export const scrappUrl = (url: string) => {
    return ({
        getTitle: async () => {        
            const html = await rp.get(url);                    
            const data: any = cheerio
            .parseHTML(cheerio.load(html)
            .html('head > title'))[0];                  
            return data.children[0].data;
        },
        getBody: async () => {        
            const html = await rp.get(url);                    
            const data: any = cheerio
            .parseHTML(cheerio.load(html)
            .html('body'))[0];                  
            return data.children[0].data;
        }
    })
}