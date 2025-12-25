import MapSearch from '@/components/MapSearch/MapSearch';

export default function RoomsMapSearchPage() {
  return (
    <MapSearch
      propertyType="room"
      apiEndpoint="rooms-for-user"
      detailPagePath="/rooms"
      title="Smart Map Search - Rooms"
    />
  );
}
