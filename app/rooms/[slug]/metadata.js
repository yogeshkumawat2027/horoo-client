export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    // Fetch room details from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${slug}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return {
        title: 'Room Not Found | Horoo',
        description: 'The requested room listing could not be found.',
      };
    }

    const data = await response.json();
    const room = data.data || data;

    const title = `${room.horooName} - Room for Rent in ${room.area?.name || ''}, ${room.city?.name || ''} | Horoo`;
    const description = `${room.horooName} available for rent in ${room.area?.name || ''}, ${room.city?.name || ''}. ₹${room.ownerPrice || room.horooPrice}/month. ${room.roomType?.join(', ') || ''} room. Direct contact with owner. View details on Horoo.`;

    return {
      title,
      description,
      keywords: `room for rent ${room.city?.name}, ${room.horooName}, PG in ${room.area?.name}, accommodation ${room.city?.name}, room rent ${room.state?.name}`,
      openGraph: {
        title,
        description,
        images: [room.mainImage || '/logo/LogoOfHoroo.jpg'],
        url: `https://horoo.in/rooms/${slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [room.mainImage || '/logo/LogoOfHoroo.jpg'],
      },
      alternates: {
        canonical: `/rooms/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Room for Rent | Horoo',
      description: 'Find verified rooms for rent across India on Horoo.',
    };
  }
}
