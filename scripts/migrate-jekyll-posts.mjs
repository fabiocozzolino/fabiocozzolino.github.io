import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const root = process.cwd();
const sourceDir = path.join(root, '_posts');
const targetDir = path.join(root, 'src', 'content', 'blog');

const asArray = (value) => {
  if (value == null || value === '') return [];
  return Array.isArray(value) ? value.map(String) : [String(value)];
};

const slugFromFile = (fileName) => fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.(md|markdown)$/i, '');

const normalizePermalink = (value, fileName) => {
  const permalink = String(value || `/${slugFromFile(fileName)}/`);
  return `/${permalink.replace(/^\/+|\/+$/g, '')}/`;
};

const fallbackPermalink = (fileName) => `/${slugFromFile(fileName)}/`;

const serialize = (data) => yaml.dump(data, { lineWidth: -1, noRefs: true, sortKeys: false }).trim();

await fs.mkdir(targetDir, { recursive: true });
const entries = (await fs.readdir(sourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.(md|markdown)$/i.test(entry.name))
  .sort((a, b) => a.name.localeCompare(b.name));

let migrated = 0;
const seenPermalinks = new Map();

for (const entry of entries) {
  const sourcePath = path.join(sourceDir, entry.name);
  const source = await fs.readFile(sourcePath, 'utf8');
  const parsed = matter(source);
  const frontmatter = parsed.data;
  let permalink = normalizePermalink(frontmatter.permalink, entry.name);

  if (seenPermalinks.has(permalink)) {
    const originalPermalink = permalink;
    permalink = fallbackPermalink(entry.name);
    console.warn(`Duplicate permalink ${originalPermalink}: ${seenPermalinks.get(originalPermalink)} and ${entry.name}. Using ${permalink} for the latter.`);
    if (seenPermalinks.has(permalink)) {
      throw new Error(`Fallback permalink ${permalink} is also duplicated by ${seenPermalinks.get(permalink)} and ${entry.name}`);
    }
  }
  seenPermalinks.set(permalink, entry.name);

  const output = {
    title: String(frontmatter.title || slugFromFile(entry.name)),
    date: new Date(frontmatter.date || entry.name.slice(0, 10)).toISOString(),
    permalink,
    tags: asArray(frontmatter.tags),
    categories: asArray(frontmatter.categories),
    author: String(frontmatter.author || 'fabiocozzolino'),
    published: frontmatter.published !== false,
    legacyLayout: frontmatter.layout ? String(frontmatter.layout) : undefined,
    legacyId: frontmatter.id,
  };

  Object.keys(output).forEach((key) => output[key] === undefined && delete output[key]);
  await fs.writeFile(path.join(targetDir, entry.name), `---\n${serialize(output)}\n---\n${parsed.content.trimStart()}`, 'utf8');
  migrated += 1;
}

console.log(`Migrated ${migrated} Jekyll posts to ${path.relative(root, targetDir)}.`);
console.log(`Preserved ${seenPermalinks.size} explicit or derived permalinks.`);