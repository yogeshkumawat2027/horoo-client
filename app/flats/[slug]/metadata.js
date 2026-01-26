export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/flats/${slug}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return {
        title: 'Flat Not Found | Horoo',
        description: 'The requested flat listing could not be found.',
      };
    }

    const data = await response.json();
    const flat = data.data || data;

    const title = `${flat.horooName} - Flat for Rent in ${flat.area?.name || ''}, ${flat.city?.name || ''} | Horoo`;
    const description = `${flat.horooName} available for rent in ${flat.area?.name || ''}, ${flat.city?.name || ''}. ₹${flat.ownerPrice || flat.horooPrice}/month. ${flat.flatType?.join(', ') || ''} flat. Direct contact with owner. View details on Horoo.`;

    return {
      title,
      description,
      keywords: `flat for rent ${flat.city?.name}, ${flat.horooName}, apartment ${flat.area?.name}, flat rent ${flat.state?.name}`,
      openGraph: {
        title,
        description,
        images: [flat.mainImage || '/logo/LogoOfHoroo.jpg'],
        url: `https://horoo.in/flats/${slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [flat.mainImage || '/logo/LogoOfHoroo.jpg'],
      },
      alternates: {
        canonical: `/flats/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Flat for Rent | Horoo',
      description: 'Find verified flats for rent across India on Horoo.',
    };
  }
}
