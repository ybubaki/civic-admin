import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TableRow, TableCell } from "./ui/table";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/service/user.service";
import { BASE_URL } from "@/service";
import { StarIcon } from "lucide-react";

const UserDetailSheet = ({ user }) => {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [rating, setRating] = useState(user.rating);

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  const handleUpdateUser = (formData) => {
    const token = localStorage.getItem("token");
    mutate({
      id: user.id,
      formData,
      token,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <TableRow>
          <TableCell className="font-medium">{user.name}</TableCell>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell className="text-right">{user.email}</TableCell>
        </TableRow>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit user</SheetTitle>
          <SheetDescription>
            Make changes to your user here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-auto">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input
              id="sheet-demo-name"
              defaultValue={user.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input
              id="sheet-demo-username"
              defaultValue={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-email">Email</Label>
            <Input
              id="sheet-demo-email"
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-phone">Phone</Label>
            <Input
              id="sheet-demo-phone"
              defaultValue={user.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-rating">Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((starNumber) => (
                  <StarIcon
                    key={starNumber}
                    className={rating >= starNumber ? "text-yellow-400" : ""}
                    onClick={() => setRating(starNumber)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-role">Role</Label>
            <Input id="sheet-demo-role" defaultValue={user.role} disabled />
          </div>
          {user.role !== "admin" && (
            <div className="grid gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={isPending}
                onClick={() => handleUpdateUser({ role: "admin" })}
              >
                {isPending ? "Saving changes..." : "Make admin"}
              </Button>
            </div>
          )}
          <div className="grid gap-3">
            <h2 className="text-lg font-semibold">Reports</h2>
            {user.reports.length > 0 ? (
              <div className="flex flex-col gap-2">
                {user.reports.map((report) => (
                  <MiniReportCard key={report.id} report={report} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No reports</p>
            )}
          </div>
        </div>
        <SheetFooter>
          <Button
            disabled={isPending || name == "" || username == "" || email == ""}
            onClick={() =>
              handleUpdateUser({
                name,
                username,
                email,
                phone,
                rating,
              })
            }
          >
            {isPending ? "Saving changes..." : "Save changes"}
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

function MiniReportCard({ report }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={BASE_URL + report.imageUrl}
        alt={report.title}
        className="w-16 h-14 object-cover object-center rounded-lg shrink-0"
      />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium line-clamp-1">{report.title}</span>
        <span className="text-xs text-muted-foreground">{report.category}</span>
      </div>
    </div>
  );
}

export default UserDetailSheet;
