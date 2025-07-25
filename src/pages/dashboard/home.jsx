import ChartBarMultiple from "@/components/chart-bar-multiple";
import { ChartBarHorizontal } from "@/components/chart-bar-vertical";
import { useSearchIssues } from "@/hooks/use-issues";
import StatsMapView from "@/components/stats-map-view";

function Home() {
  const { data, isPending, error } = useSearchIssues("");
  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <h2 className="text-center text-2xl font-semibold mb-8">Statistics</h2>
      <div className="w-[90%] mx-auto flex gap-8">
        {/* {data && <ChartBarMultiple data={data.data} />} */}
        <div className="flex-1">
          {data && <ChartBarHorizontal data={data.data} />}
        </div>
        <div className="flex-1 h-full space-y-2">
          <h3 className="text-lg font-semibold">Citywide Issues Heatmap</h3>
          {data && <StatsMapView data={data.data} />}
        </div>
      </div>
    </div>
  );
}

export default Home;
