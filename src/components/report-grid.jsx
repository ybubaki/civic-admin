import { BASE_URL } from "@/service/index";
import ReportDetailSheet from "./report-detail";

const ReportGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((issue) => (
        <ReportDetailSheet key={issue.id} report={issue}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer">
            <img
              src={BASE_URL + issue.imageUrl}
              alt={issue.title}
              className="w-full h-64 object-cover object-center rounded-t-lg"
            />
            <div className="p-4 flex flex-col gap-2">
              <p className="text-gray-500 text-xs">
                {new Intl.DateTimeFormat("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(issue.createdAt))}
              </p>
              <div>
                <h2 className="text-lg font-semibold line-clamp-1 dark:text-white">
                  {issue.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3 dark:text-gray-300">
                  {issue.description}
                </p>
              </div>
              <div className="flex flex-row-reverse items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      issue.priority == "high"
                        ? "bg-red-500"
                        : issue.priority == "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <p className="text-gray-500 text-sm font-medium dark:text-white">
                    {issue.priority.toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500 bg-gray-200 rounded-full px-4 py-1 text-xs font-medium dark:bg-gray-700 dark:text-white">
                    {issue.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ReportDetailSheet>
      ))}
    </div>
  );
};

export default ReportGrid;
