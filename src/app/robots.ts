import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://wsc-art.vercel.app/sitemap.xml', // TODO: Update with actual domain
    }
}
