import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

export const scrappUrl = (url: string) => {
    const titleSelector = 'head > title';
    const topUrlsSelector = '#top-500-domains > table > tbody';
    const bodySelector = 'body';
    return ({
        getTitle: async () => {        
            const html = await rp.get(url); 
            const rawTitle = cheerio.load(html).html(titleSelector);
            let titles: CheerioElement[] = rawTitle ? cheerio.parseHTML(cheerio.load(html).html('head > title')) as CheerioElement[] : [];
            return await titles.length > 0 && titles[0].children.length > 0 ? titles[0].children[0].data : '';
        },
        getUrls: async () => {        
            const html = await rp.get(url);                    
            const data: any = cheerio
            .parseHTML(cheerio.load(html)
            .html(topUrlsSelector));
            return data;
        },
        getBody: async () => {        
            const html = await rp.get(url);                    
            const data: any = cheerio
            .parseHTML(cheerio.load(html)
            .html(bodySelector))[0];
            return data.children[0].data;
        }
    })
}