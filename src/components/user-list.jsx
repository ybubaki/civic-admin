import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import UserDetailSheet from "./user-detail";

const UserList = ({ data }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Account Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <UserDetailSheet key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
