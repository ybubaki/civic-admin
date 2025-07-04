import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BASE_URL } from "@/service/index";
import { Label } from "./ui/label";
import MapView from "./map-view";
import { useMutation } from "@tanstack/react-query";
import { updateIssue } from "@/service/issue.service";
import { useQueryClient } from "@tanstack/react-query";

const ReportDetailSheet = ({ report, children }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateIssue,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries();
    },
  });

  const handleUpdateStatus = () => {
    const token = localStorage.getItem("token");
    mutate({
      id: report.id,
      formData: {
        status: report.status === "closed" ? "open" : "closed",
      },
      token,
    });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Report Detail</SheetTitle>
          <SheetDescription>
            View report details here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-6 px-4 overflow-y-auto scrollbar-none">
          <div className="space-y-2">
            <img
              src={BASE_URL + report.imageUrl}
              alt={report.title}
              className="w-full h-64 object-cover object-center rounded-lg"
            />
            <p className="text-sm text-gray-500">
              {new Intl.DateTimeFormat("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(report.createdAt))}
            </p>
          </div>
          <div className="space-y-3 pb-6">
            <p className="text-lg font-bold">{report.title}</p>
            <div className="flex flex-col gap-1">
              <Label>Description</Label>
              <p className="text-sm text-gray-500 line-clamp-3">
                {report.description}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Priority</Label>
              <p className="text-sm text-gray-500">{report.priority}</p>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Category</Label>
              <p className="text-sm text-gray-500">{report.category}</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col gap-1">
                <Label>Status</Label>
                <p className="text-sm text-gray-500">{report.status}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={isPending}
                onClick={handleUpdateStatus}
              >
                {isPending
                  ? "Closing..."
                  : report.status === "closed"
                  ? "Open"
                  : "Close"}
              </Button>
            </div>
          </div>
          {report.latitude && report.longitude && (
            <div className="flex flex-col gap-1 mb-6">
              <Label>Location</Label>
              <MapView lat={report.latitude} lng={report.longitude} />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReportDetailSheet;
