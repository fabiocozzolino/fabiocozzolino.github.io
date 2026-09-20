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
const entries = (await fs.readdir(sourceDir, { recursive: true }))
  .filter((entry) => /\.(md|markdown)$/i.test(entry))
  .sort((a, b) => a.localeCompare(b));

let migrated = 0;
const seenPermalinks = new Map();

for (const entry of entries) {
  const fileName = path.basename(entry);
  const sourcePath = path.join(sourceDir, entry);
  const source = await fs.readFile(sourcePath, 'utf8');
  const parsed = matter(source);
  const frontmatter = parsed.data;
  let permalink = normalizePermalink(frontmatter.permalink, fileName);

  if (seenPermalinks.has(permalink)) {
    const originalPermalink = permalink;
    permalink = fallbackPermalink(fileName);
    console.warn(`Duplicate permalink ${originalPermalink}: ${seenPermalinks.get(originalPermalink)} and ${entry}. Using ${permalink} for the latter.`);
    if (seenPermalinks.has(permalink)) {
      throw new Error(`Fallback permalink ${permalink} is also duplicated by ${seenPermalinks.get(permalink)} and ${entry}`);
    }
  }
  seenPermalinks.set(permalink, entry);

  const output = {
    title: String(frontmatter.title || slugFromFile(fileName)),
    pubDatetime: new Date(frontmatter.date || fileName.slice(0, 10)).toISOString(),
    description: frontmatter.description ? String(frontmatter.description) : undefined,
    tags: asArray(frontmatter.tags),
    draft: frontmatter.published === false,
    permalink,
  };

  Object.keys(output).forEach((key) => output[key] === undefined && delete output[key]);
  const outputName = path.basename(entry);
  await fs.writeFile(path.join(targetDir, outputName), `---\n${serialize(output)}\n---\n${parsed.content.trimStart()}`, 'utf8');
  migrated += 1;
}

console.log(`Migrated ${migrated} Jekyll posts to ${path.relative(root, targetDir)}.`);
console.log(`Preserved ${seenPermalinks.size} explicit or derived permalinks.`);