import { scrappUrl, shortenUrl } from './../utils';
import Url from '../models/Url';

export const populateDB = async () => {
    const site = 'https://moz.com/top500';
    const urls: any = await scrappUrl(site).getUrls();
    const children: any[] = urls[0].children;

    const bulkData = children
            .map(c => `http://${c.children[1].children[0].children[0].data}`)
            .map((c: any, idx: number) => 
                    ({
                        url: c,
                        title: '',
                        created_at: '',
                        shortUrl: shortenUrl(`${idx}`),
                        visits: Math.floor(Math.random() * 350 - 1)
                    })
            );
    saveAll(bulkData);

    // console.log(bulkData);
}

const saveAll = async (data: any[]) => {
    await Url.deleteMany({}, () =>{
        console.log('all records have been deleted 😈 😀 💀')
    });
    await Url.create(data, (err: any, docs: any[]) => {
        if (err) return console.error(err);
        console.log('bulk save succeded 😄 😎', docs[0]);
    });
}