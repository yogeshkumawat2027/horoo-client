export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/house/${slug}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return {
        title: 'House Not Found | Horoo',
        description: 'The requested house listing could not be found.',
      };
    }

    const data = await response.json();
    const house = data.data || data;

    const title = `${house.horooName} - House for Rent in ${house.area?.name || ''}, ${house.city?.name || ''} | Horoo`;
    const description = `${house.horooName} available for rent in ${house.area?.name || ''}, ${house.city?.name || ''}. ₹${house.ownerPrice || house.horooPrice}/month. ${house.houseType?.join(', ') || ''} house. Direct contact with owner. View details on Horoo.`;

    return {
      title,
      description,
      keywords: `house for rent ${house.city?.name}, ${house.horooName}, independent house ${house.area?.name}, house rent ${house.state?.name}`,
      openGraph: {
        title,
        description,
        images: [house.mainImage || '/logo/LogoOfHoroo.jpg'],
        url: `https://horoo.in/house/${slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [house.mainImage || '/logo/LogoOfHoroo.jpg'],
      },
      alternates: {
        canonical: `/house/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'House for Rent | Horoo',
      description: 'Find verified houses for rent across India on Horoo.',
    };
  }
}
