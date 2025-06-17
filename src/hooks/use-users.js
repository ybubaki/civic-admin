import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../service/user.service";

export const useUsers = () => {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["users", token],
    queryFn: () => getUsers(token),
  });
};
