export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hostels/${slug}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return {
        title: 'Hostel Not Found | Horoo',
        description: 'The requested hostel listing could not be found.',
      };
    }

    const data = await response.json();
    const hostel = data.data || data;

    const title = `${hostel.horooName} - Hostel in ${hostel.area?.name || ''}, ${hostel.city?.name || ''} | Horoo`;
    const description = `${hostel.horooName} available in ${hostel.area?.name || ''}, ${hostel.city?.name || ''}. ₹${hostel.ownerPrice || hostel.horooPrice}/month. ${hostel.hostelType?.join(', ') || ''} hostel. Direct contact with owner. View details on Horoo.`;

    return {
      title,
      description,
      keywords: `hostel ${hostel.city?.name}, ${hostel.horooName}, PG in ${hostel.area?.name}, hostel rent ${hostel.state?.name}`,
      openGraph: {
        title,
        description,
        images: [hostel.mainImage || '/logo/LogoOfHoroo.jpg'],
        url: `https://horoo.in/hostels/${slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [hostel.mainImage || '/logo/LogoOfHoroo.jpg'],
      },
      alternates: {
        canonical: `/hostels/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Hostel | Horoo',
      description: 'Find verified hostels across India on Horoo.',
    };
  }
}
