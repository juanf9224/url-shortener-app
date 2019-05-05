import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

export const scrappUrl = (url: string) => {
    return ({
        getTitle: async () => {        
            const html = await rp.get(url); 
            const rawTitle = cheerio.load(html).html('head > title');
            let titles: CheerioElement[] = rawTitle ? cheerio.parseHTML(cheerio.load(html).html('head > title')) as CheerioElement[] : [];
            return await titles.length > 0 && titles[0].children.length > 0 ? titles[0].children[0].data : '';
        },
        getUrls: async () => {        
            const html = await rp.get(url);                    
            const data: any = cheerio
            .parseHTML(cheerio.load(html)
            .html('#top-500-domains > table > tbody'));                  
            return data;
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