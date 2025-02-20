import { MapPin } from "lucide-react";

interface SearchResultItemProps {
  result: { address: string; lat: number; lng: number };
  onSelect: (address: string, lat: number, lng: number) => void;
}

const SearchResultItem = ({ result, onSelect }: SearchResultItemProps) => {
  return (
    <div
      className="p-2 cursor-pointer hover:bg-gray-200 flex items-center space-x-2"
      onClick={() => onSelect(result.address, result.lat, result.lng)}
    >
      <MapPin className="w-4 h-4 text-gray-500" />
      <span className="text-sm text-gray-900">{result.address}</span>
    </div>
  );
};

export default SearchResultItem;
