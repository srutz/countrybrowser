
import { parseString } from 'xml2js';

export type NewsItem = {
    title: string;
    description: string;
    pubDate: string;
    link: string;
}

export async function loadNewsFeed(): Promise<NewsItem[]> {
    const feedUrl = 'https://www.tagesschau.de/xml/rss2/'
    const response = await fetch(feedUrl)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const xmlData = await response.text()

    return new Promise((resolve, reject) => {
        parseString(xmlData, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            console.log(result.rss)
            const items = result.rss.channel[0].item
            const newsItems: NewsItem[] = items.map((item: any) => ({
                title: item.title[0],
                description: item.description[0],
                pubDate: item.pubDate[0],
                link: item.link[0],
            }))
            resolve(newsItems)
        })
    })
}
