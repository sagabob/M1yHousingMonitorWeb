import { useListingTypesByCode, useAllListingTypes } from "@/data-services/hooks/useListingTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Example component showing how to use the listing types API
const ListingTypesExample = () => {
  // Fetch listing types for a specific code (like your example: 2GMEL)
  const { 
    data: specificListings, 
    isLoading: isLoadingSpecific, 
    error: specificError 
  } = useListingTypesByCode("2GMEL", 50);

  // Fetch all listing types
  const { 
    data: allListings, 
    isLoading: isLoadingAll, 
    error: allError 
  } = useAllListingTypes(50);

  if (isLoadingSpecific || isLoadingAll) {
    return <div>Loading listing types...</div>;
  }

  if (specificError || allError) {
    return <div>Error: {specificError?.message || allError?.message}</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Listing Types for Code: 2GMEL</CardTitle>
        </CardHeader>
        <CardContent>
          {specificListings && specificListings.length > 0 ? (
            <div className="space-y-2">
              {specificListings.map((listing) => (
                <div key={listing.id || listing.code} className="p-2 border rounded">
                  <div className="font-medium">{listing.name}</div>
                  <div className="text-sm text-gray-600">Code: {listing.code}</div>
                  {listing.description && (
                    <div className="text-sm text-gray-500">{listing.description}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>No listing types found for code 2GMEL</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Listing Types (First 50)</CardTitle>
        </CardHeader>
        <CardContent>
          {allListings && allListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {allListings.map((listing) => (
                <div key={listing.id || listing.code} className="p-2 border rounded">
                  <div className="font-medium">{listing.name}</div>
                  <div className="text-sm text-gray-600">Code: {listing.code}</div>
                  {listing.description && (
                    <div className="text-sm text-gray-500">{listing.description}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>No listing types found</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingTypesExample;