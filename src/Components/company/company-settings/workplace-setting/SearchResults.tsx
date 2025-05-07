import SearchResultItem from "./SearchResultItem";

interface SearchResultsProps {
  searchResults: { address: string; lat: number; lng: number }[];
  noResult: boolean;
  onSelect: (address: string, lat: number, lng: number) => void;
}

const SearchResults = ({ searchResults, noResult, onSelect }: SearchResultsProps) => {
  return (
    <div className="absolute left-0 top-full z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-md border bg-white shadow-md">
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <SearchResultItem key={index} result={result} onSelect={onSelect} />
        ))
      ) : noResult ? (
        <div className="p-2 text-center text-sm text-gray-500">검색 결과가 없습니다.</div>
      ) : null}
    </div>
  );
};

export default SearchResults;
