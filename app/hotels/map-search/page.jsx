import MapSearch from '@/components/MapSearch/MapSearch';

export default function HotelsMapSearchPage() {
  return (
    <MapSearch
      propertyType="hotelroom"
      apiEndpoint="hotelrooms-for-user"
      detailPagePath="/hotels"
      title="Smart Map Search - Hotels"
    />
  );
}
