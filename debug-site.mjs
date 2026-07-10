import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '.env.local') });

const siteSchema = new mongoose.Schema({}, { strict: false });
const Site = mongoose.models.Site || mongoose.model('Site', siteSchema, 'sites');

await mongoose.connect(process.env.MONGODB_URI);
// console.log('Connected to DB');

// 1. Show ALL sites (first 10)
const all = await Site.find({ published: true })
    .select('title board level class slug published')
    .limit(10).lean();

// console.log('\n=== ALL PUBLISHED SITES ===');
all.forEach(s => {
    // console.log(`  title: "${s.title}"`);
    // console.log(`  board: "${s.board}"  level: "${s.level}"  class: "${s.class}"  slug: "${s.slug}"`);
    // console.log('  ---');
});

// 2. Search specifically by the slug from the URL
const bySlug = await Site.findOne({ slug: '11th-class-smart-syllabus' })
    .lean();
// console.log('\n=== SEARCH BY SLUG "11th-class-smart-syllabus" ===');
if (bySlug) {
    console.log(JSON.stringify({
        board: bySlug.board,
        level: bySlug.level,
        class: bySlug.class,
        slug: bySlug.slug,
        published: bySlug.published
    }, null, 2));
} else {
    console.log('NOT FOUND by slug!');
}

// 3. Try the exact query getSiteByPath uses (with regex)
const byPath = await Site.findOne({
    board: { $regex: '^punjab-board$', $options: 'i' },
    level: { $regex: '^inter$', $options: 'i' },
    class: { $regex: '^11th$', $options: 'i' },
    slug: { $regex: '^11th-class-smart-syllabus$', $options: 'i' },
    published: true
}).lean();
// console.log('\n=== REGEX QUERY RESULT ===');
// console.log(byPath ? `FOUND: ${byPath.title}` : 'NOT FOUND by path regex');

await mongoose.disconnect();
