export default function robots() {
  return {
    rules: {
      userAgent: '*',
      disallow: '/', // Disallow all pages
    },
    sitemap: false, // Optional: Exclude sitemap if you don't want it referenced
  };
}