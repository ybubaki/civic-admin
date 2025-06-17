import { useSearchIssues } from "@/hooks/use-issues";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReportGrid from "@/components/report-grid";

export default function Reports() {
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const { data, isLoading, error } = useSearchIssues(search);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSearch = () => {
    setSearch(input);
  };
  //   console.log(data);
  return (
    <div>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button
          className="bg-green-500 text-white hover:bg-green-600"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <div className="mt-8">
        <ReportGrid data={data.data} />
      </div>
    </div>
  );
}
