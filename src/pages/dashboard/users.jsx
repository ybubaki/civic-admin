import { useState } from "react";
import { useUsers } from "@/hooks/use-users";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserList from "@/components/user-list";

export default function Users() {
  const [input, setInput] = useState("");
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSearch = () => {
    setSearch(input);
  };
  console.log(data);
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
        <UserList data={data.data} />
      </div>
    </div>
  );
}
