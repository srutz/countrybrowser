
import { parseString } from 'xml2js';
import { DOMParser } from 'xmldom';

export type NewsItem = {
    title: string
    description: string
    pubDate: string
    link: string
    contentEncoded?: string
    images: string[]
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
            //console.log(result.rss)
            const items = result.rss.channel[0].item
            const newsItems: NewsItem[] = items.map((item: any) => ({
                title: item.title[0],
                description: item.description[0],
                pubDate: item.pubDate[0],
                link: item.link[0],
                contentEncoded: item['content:encoded'] ? item['content:encoded'][0] : undefined,
                images: []
            } satisfies NewsItem))
            // enrich images
            newsItems.forEach((item) => item.images.push(...extractImages(item.contentEncoded)))
            resolve(newsItems)
        })
    })
}

function extractImages(xmlContent?: string) {
    const images: string[] = []
    if (xmlContent) {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xmlContent, 'text/xml')
        const imgTag = xmlDoc.getElementsByTagName('img')
        for (let i = 0; i < imgTag.length; i++) {
            const src = imgTag[i].getAttribute('src')
            if (src) {
                images.push(src)
            }
        }
    }
    return images
}

