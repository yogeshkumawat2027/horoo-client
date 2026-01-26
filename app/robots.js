export default function robots() {
  const baseUrl = 'https://horoo.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/owner-dashboard/', '/profile/', '/complete-profile/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
