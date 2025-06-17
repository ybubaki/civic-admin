import ChartBarMultiple from "@/components/chart-bar-multiple";
import { useSearchIssues } from "@/hooks/use-issues";

function Home() {
  const { data, isPending, error } = useSearchIssues("");
  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className="w-[70%] mx-auto">
        {data && <ChartBarMultiple data={data.data} />}
      </div>
    </div>
  );
}

export default Home;
