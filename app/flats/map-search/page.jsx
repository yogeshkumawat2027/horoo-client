import MapSearch from '@/components/MapSearch/MapSearch';

export default function FlatsMapSearchPage() {
  return (
    <MapSearch
      propertyType="flat"
      apiEndpoint="flats-for-user"
      detailPagePath="/flats"
      title="Smart Map Search - Flats"
    />
  );
}
