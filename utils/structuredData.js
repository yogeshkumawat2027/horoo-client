// JSON-LD Structured Data Generator for SEO

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Horoo',
    url: 'https://horoo.in',
    logo: 'https://horoo.in/logo/LogoOfHoroo.jpg',
    description: 'India\'s trusted rental property platform connecting owners and seekers',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurgaon',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9166260477',
      contactType: 'Customer Service',
      email: 'support@horoo.com',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.facebook.com/horoo',
      'https://www.instagram.com/horoo',
      'https://www.linkedin.com/company/horoo',
      'https://twitter.com/horoo',
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Horoo',
    url: 'https://horoo.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://horoo.in/rooms?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://horoo.in${item.url}`,
    })),
  };
}

export function generatePropertySchema(property, type = 'room') {
  const typeMap = {
    room: 'Room',
    flat: 'Apartment',
    house: 'House',
    hostel: 'Hostel',
    hotel: 'Hotel',
    commercial: 'CommercialProperty',
  };

  return {
    '@context': 'https://schema.org',
    '@type': typeMap[type] || 'Accommodation',
    name: property.horooName,
    description: property.description || `${property.horooName} available for rent`,
    image: property.mainImage,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.area?.name,
      addressRegion: property.city?.name,
      addressCountry: 'IN',
    },
    offers: {
      '@type': 'Offer',
      price: property.ownerPrice || property.horooPrice,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://horoo.in/${type}s/${property.slug || property.horooId}`,
    },
    geo: property.latitude && property.longitude ? {
      '@type': 'GeoCoordinates',
      latitude: property.latitude,
      longitude: property.longitude,
    } : undefined,
  };
}

export function generateRealEstateListingSchema(property, type = 'room') {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.horooName,
    description: property.description || `${property.horooName} available for rent`,
    image: property.mainImage,
    url: `https://horoo.in/${type}s/${property.slug || property.horooId}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.area?.name,
      addressRegion: property.city?.name,
      postalCode: property.pincode,
      addressCountry: 'IN',
    },
    offers: {
      '@type': 'Offer',
      price: property.ownerPrice || property.horooPrice,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function generateAggregateRatingSchema(property) {
  if (!property.averageRating || property.totalRatings === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: property.averageRating,
    reviewCount: property.totalRatings,
    bestRating: '5',
    worstRating: '1',
  };
}

export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
