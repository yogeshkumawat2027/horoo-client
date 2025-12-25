import MapSearch from '@/components/MapSearch/MapSearch';

export default function HostelsMapSearchPage() {
  return (
    <MapSearch
      propertyType="hostel"
      apiEndpoint="hostels-for-user"
      detailPagePath="/hostels"
      title="Smart Map Search - Hostels"
    />
  );
}
