export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/commercials/${slug}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return {
        title: 'Commercial Space Not Found | Horoo',
        description: 'The requested commercial space listing could not be found.',
      };
    }

    const data = await response.json();
    const commercial = data.data || data;

    const title = `${commercial.horooName} - Commercial Space in ${commercial.area?.name || ''}, ${commercial.city?.name || ''} | Horoo`;
    const description = `${commercial.horooName} available for rent in ${commercial.area?.name || ''}, ${commercial.city?.name || ''}. ₹${commercial.ownerPrice || commercial.horooPrice}/month. ${commercial.commercialType?.join(', ') || ''} commercial space. Direct contact with owner. View details on Horoo.`;

    return {
      title,
      description,
      keywords: `commercial space ${commercial.city?.name}, ${commercial.horooName}, office space ${commercial.area?.name}, shop rent ${commercial.state?.name}`,
      openGraph: {
        title,
        description,
        images: [commercial.mainImage || '/logo/LogoOfHoroo.jpg'],
        url: `https://horoo.in/commercials/${slug}`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [commercial.mainImage || '/logo/LogoOfHoroo.jpg'],
      },
      alternates: {
        canonical: `/commercials/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Commercial Space | Horoo',
      description: 'Find verified commercial spaces for rent across India on Horoo.',
    };
  }
}
