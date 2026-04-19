export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'why-we-built-alpha-omega-strength-team',
    title: 'Why We Built Alpha Omega Strength Team',
    date: '2026-03-26',
    excerpt: 'Before this was a brand, it was a conviction.',
    tags: ['Faith', 'First Drop', 'Origin Story'],
    author: 'Alpha Omega Strength Team',
    content: `<p>Before this was a brand, it was a conviction.</p>
<p>Alpha Omega Strength Team was born from a simple truth: the same God who calls us to run the race with endurance is the same God who gives us the strength to finish it. He is the Alpha — the beginning of every purpose, every plan, every first rep. And He is the Omega — the One who sees us through to the end.</p>
<h3>Why Faith and Fitness?</h3>
<p>Training isn't just physical. Every time you show up — tired, sore, doubting — and push through anyway, you're exercising the same muscle that faith requires. Discipline. Perseverance. Trust in something bigger than the moment.</p>
<blockquote>"No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it." — Hebrews 12:11</blockquote>
<h3>What This Brand Stands For</h3>
<p>We're not here to sell you hype. We're here to build something real — a community of people who train with purpose, live with conviction, and wear their faith boldly. Every piece we make carries that standard.</p>
<p>When you put on Alpha Omega, you're not just wearing a shirt. You're making a statement: <strong>I know who gives me my strength.</strong></p>
<blockquote>"I can do all things through Christ who strengthens me." — Philippians 4:13</blockquote>
<h3>The First Drop</h3>
<p>On <strong>April 15, 2026 at 8:00 PM EST</strong>, we released our first collection. Limited pieces. Built for the faithful. This is just the beginning.</p>
<p>Stay strong. Stay faithful. Stay ready.</p>
<p>— The Alpha Omega Strength Team</p>`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts
    .filter((post) => post.tags.includes(tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
