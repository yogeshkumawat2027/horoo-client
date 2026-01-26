export default async function sitemap() {
  const baseUrl = 'https://horoo.in';

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/owner/guidelines`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/list-rental`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  // Property category routes
  const propertyCategories = [
    'rooms',
    'flats',
    'hostels',
    'house',
    'commercials',
    'hotels',
  ];

  const categoryRoutes = propertyCategories.map((category) => ({
    url: `${baseUrl}/${category}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Fetch dynamic property listings from API
  let propertyRoutes = [];
  
  try {
    // Fetch all property types
    const propertyTypes = ['rooms', 'flats', 'hostels', 'house', 'commercials', 'hotels'];
    
    for (const type of propertyTypes) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${type}`, {
          next: { revalidate: 3600 } // Revalidate every hour
        });
        
        if (response.ok) {
          const data = await response.json();
          const properties = data.data || data || [];
          
          const routes = properties.map((property) => ({
            url: `${baseUrl}/${type}/${property.slug || property.horooId}`,
            lastModified: new Date(property.updatedAt || property.createdAt || Date.now()),
            changeFrequency: 'weekly',
            priority: 0.7,
          }));
          
          propertyRoutes = [...propertyRoutes, ...routes];
        }
      } catch (error) {
        console.error(`Error fetching ${type} for sitemap:`, error);
      }
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
  }

  return [...staticRoutes, ...categoryRoutes, ...propertyRoutes];
}
