import SearchResultItem from "./SearchResultItem";

interface SearchResultsProps {
  searchResults: { address: string; lat: number; lng: number }[];
  noResult: boolean;
  onSelect: (address: string, lat: number, lng: number) => void;
}

const SearchResults = ({ searchResults, noResult, onSelect }: SearchResultsProps) => {
  return (
    <div className="absolute top-full left-0 w-full border rounded-md bg-white shadow-md max-h-40 overflow-y-auto mt-1 z-50">
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <SearchResultItem key={index} result={result} onSelect={onSelect} />
        ))
      ) : noResult ? (
        <div className="p-2 text-center text-gray-500 text-sm">검색 결과가 없습니다.</div>
      ) : null}
    </div>
  );
};

export default SearchResults;
