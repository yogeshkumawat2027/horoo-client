export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotels/${slug}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return {
        title: 'Hotel Room Not Found | Horoo',
        description: 'The requested hotel room listing could not be found.',
      };
    }

    const data = await response.json();
    const hotel = data.data || data;

    const title = `${hotel.horooName} - Hotel Room in ${hotel.area?.name || ''}, ${hotel.city?.name || ''} | Horoo`;
    const description = `${hotel.horooName} available in ${hotel.area?.name || ''}, ${hotel.city?.name || ''}. ₹${hotel.ownerPrice || hotel.horooPrice}/month. ${hotel.hotelType?.join(', ') || ''} hotel room. Direct contact with owner. View details on Horoo.`;

    return {
      title,
      description,
      keywords: `hotel room ${hotel.city?.name}, ${hotel.horooName}, accommodation ${hotel.area?.name}, hotel rent ${hotel.state?.name}`,
      openGraph: {
        title,
        description,
        images: [hotel.mainImage || '/logo/LogoOfHoroo.jpg'],
        url: `https://horoo.in/hotels/${slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [hotel.mainImage || '/logo/LogoOfHoroo.jpg'],
      },
      alternates: {
        canonical: `/hotels/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Hotel Room | Horoo',
      description: 'Find verified hotel rooms across India on Horoo.',
    };
  }
}
