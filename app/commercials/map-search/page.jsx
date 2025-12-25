import MapSearch from '@/components/MapSearch/MapSearch';

export default function CommercialsMapSearchPage() {
  return (
    <MapSearch
      propertyType="commercial"
      apiEndpoint="commercials-for-user"
      detailPagePath="/commercials"
      title="Smart Map Search - Commercials"
    />
  );
}
