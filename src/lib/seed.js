import fs from 'fs';
import dns from 'dns';
import dotenv from 'dotenv';

// Setup DNS configuration to prevent resolution failures
dns.setServers(['1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

// Load environment variables before importing database modules
dotenv.config({ path: './.env.local' });

// Dynamically import database modules so environment variables are loaded first
const { default: connectDB } = await import('./mongodb.js');
const { default: Author } = await import('../models/Author.js');
const { default: Blog } = await import('../models/Blog.js');
const { default: mongoose } = await import('mongoose');

const authorsData = [
  {
    _id: '65c8f8b8e4b0a1a1a1a1a101',
    name: 'zain khokhar',
    slug: 'zain-khokhar',
    bio: 'Passionate developer and content writer specializing in web technologies and AI.',
    avatar: 'https://res.cloudinary.com/dj8ktpsll/image/upload/v1756547448/uploads/default-avatar.webp',
    email: 'zain@techolyze.com',
    social: { twitter: '', linkedin: '', website: '' },
    isActive: true
  },
  {
    _id: '65c8f8b8e4b0a1a1a1a1a102',
    name: 'max reed',
    slug: 'max-reed',
    bio: 'Senior software engineer and tech enthusiast sharing insights on software engineering and system architecture.',
    avatar: 'https://res.cloudinary.com/dj8ktpsll/image/upload/v1756547448/uploads/default-avatar.webp',
    email: 'max@techolyze.com',
    social: { twitter: '', linkedin: '', website: '' },
    isActive: true
  },
  {
    _id: '65c8f8b8e4b0a1a1a1a1a103',
    name: 'mr osman',
    slug: 'mr-osman',
    bio: 'Experienced writer focusing on tools, productivity, and full-stack development.',
    avatar: 'https://res.cloudinary.com/dj8ktpsll/image/upload/v1756547448/uploads/default-avatar.webp',
    email: 'osman@techolyze.com',
    social: { twitter: '', linkedin: '', website: '' },
    isActive: true
  },
  {
    _id: '65c8f8b8e4b0a1a1a1a1a104',
    name: 'md zawyar',
    slug: 'md-zawyar',
    bio: 'Tech writer and developer exploring next-gen frontend frameworks and developer workflows.',
    avatar: 'https://res.cloudinary.com/dj8ktpsll/image/upload/v1756547448/uploads/default-avatar.webp',
    email: 'zawyar@techolyze.com',
    social: { twitter: '', linkedin: '', website: '' },
    isActive: true
  },
  {
    _id: '65c8f8b8e4b0a1a1a1a1a105',
    name: 'naylon saeer',
    slug: 'naylon-saeer',
    bio: 'Specialist in no-code app builders, visual coding platforms, and digital transformation.',
    avatar: 'https://res.cloudinary.com/dj8ktpsll/image/upload/v1756547448/uploads/default-avatar.webp',
    email: 'naylon@techolyze.com',
    social: { twitter: '', linkedin: '', website: '' },
    isActive: true
  }
];

async function seed() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected successfully.');

    // 1. Clear existing data
    console.log('Clearing existing collections...');
    await Author.deleteMany({});
    await Blog.deleteMany({});
    console.log('Existing collections cleared.');

    // 2. Seed Authors
    console.log('Seeding authors...');
    const formattedAuthors = authorsData.map(author => ({
      ...author,
      _id: new mongoose.Types.ObjectId(author._id)
    }));
    await Author.insertMany(formattedAuthors);
    console.log(`Seeded ${formattedAuthors.length} authors.`);

    // 3. Seed Blogs
    console.log('Reading seedblogs.json...');
    const rawBlogs = JSON.parse(fs.readFileSync('./seedblogs.json', 'utf8'));
    console.log(`Loaded ${rawBlogs.length} blogs from JSON.`);

    console.log('Formatting and inserting blogs...');
    const formattedBlogs = rawBlogs.map(blog => ({
      ...blog,
      _id: new mongoose.Types.ObjectId(blog._id),
      author: new mongoose.Types.ObjectId(blog.author),
      createdAt: new Date(blog.createdAt),
      updatedAt: new Date(blog.updatedAt)
    }));

    // Use native driver insert to preserve createdAt and updatedAt
    await mongoose.connection.db.collection('blogs').insertMany(formattedBlogs);
    console.log(`Successfully seeded ${formattedBlogs.length} blogs.`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
  }
}

seed();
