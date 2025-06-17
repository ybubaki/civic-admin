import { useQuery } from "@tanstack/react-query";
import {
  getIssues,
  getIssueById,
  searchIssues,
} from "../service/issue.service";

export const useGetIssues = () => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["issues"],
    queryFn: () => getIssues(token),
  });
};

export const useGetIssuesById = (id) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["issues-by-id"],
    queryFn: () => getIssueById(id, token),
  });
};

export const useSearchIssues = (search) => {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["issues-search", search],
    queryFn: () => searchIssues(search, token),
  });
};
