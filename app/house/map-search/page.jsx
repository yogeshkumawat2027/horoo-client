import MapSearch from '@/components/MapSearch/MapSearch';

export default function HousesMapSearchPage() {
  return (
    <MapSearch
      propertyType="house"
      apiEndpoint="houses-for-user"
      detailPagePath="/house"
      title="Smart Map Search - Houses"
    />
  );
}
