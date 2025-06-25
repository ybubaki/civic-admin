import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChangePasswordDialog from "@/components/change-password-dialog";

export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="min-w-full lg:min-w-[600px]">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-center gap-4 items-center">
            <div className="h-16 flex items-center justify-center w-16 rounded-full bg-gray-200 p-2">
              <p className="text-lg font-bold">
                {user.name.split(" ")[0][0].toUpperCase() +
                  user.name.split(" ")[1][0].toUpperCase()}
              </p>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <p className="text-lg font-bold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div>
              <ChangePasswordDialog />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
