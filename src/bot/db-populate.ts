import * as fs from 'fs';
import { scrappUrl, shortenUrl } from './../utils';
import Url from '../models/Url';

export const populateDB = async () => {
    const site = 'https://moz.com/top500';
    const urls: any = await scrappUrl(site).getUrls();
    const children: any[] = urls[0].children;
    let bulkData: any;

    if(process.env.BOT_POPULATE_SOURCE === 'local'){
        // Fetch documents from json file
        const bulkDataFromFile = fs.readFileSync(__dirname+'/urls.json');
        bulkData = (JSON.parse(bulkDataFromFile.toString()) as []).map((u: any) => ({
            url: u.url,
            title: u.title,
            created_at: Date.now(),
            shortUrl: u.shortUrl,
            visits: u.visits['$numberInt']
        }));

        // console.log(bulkData);
    } else {       

    // Create objects with scrapped urls
    const bulkData = children
            .slice(0, children.length > 150 ? 151 : children.length -1)
            .map(c => `http://${c.children[1].children[0].children[0].data}`)
            .map((c: any, idx: number) => 
                    ({
                        url: c,
                        title: '',
                        created_at: new Date(),
                        shortUrl: shortenUrl(`${idx}`),
                        visits: Math.floor(Math.random() * 350 - 1)
                    })
            )
            .filter((f: any) => f.title !== '' && 
                    f.shortUlrl !== '' ||
                    f.title !== null &&
                    f.shortUrl !== null);
    }

    setTimeout(() => {        
        // console.log(bulkData);                 
        saveAll(bulkData);
    }, 3000);
};

const saveAll = async (data: any[]) => {
    // Delete Collections to have a clean db before bulk save;
    await Url.deleteMany({}, () =>{
        console.log('all records have been deleted 😈 😀 💀')
    });    
    await Url.create(data, (err: any, docs: any[]) => {
        if (err) return console.error(err);
        console.log('bulk save succeeded 😄 😎');
        process.env.BOT_POPULATE_SOURCE === 'remote' ? docs.forEach(d => {
            scrappUrl(d.url).getTitle().then(t => {
                Url.updateOne({_id: d._id}, {title: t}, (err, data) =>{
                    if (err) return console.error(`Could not update document 😞: ${err}`);
                    console.log('Document updated:  😄 😎');
                });
            }).catch(() => console.error(`Could not get title for this url: ${d.url} 😞`))
        }) : console.log('Local Data');
    });
};