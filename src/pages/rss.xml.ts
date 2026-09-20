import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { profile } from '../data/site';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf());

  return rss({
    title: `${profile.name} | ${profile.title}`,
    description: profile.bio,
    site: context.site ?? 'https://www.fabiocozzolino.eu',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDatetime,
      description: post.data.description,
      link: post.data.permalink ?? `/${post.id}/`,
    })),
  });
}