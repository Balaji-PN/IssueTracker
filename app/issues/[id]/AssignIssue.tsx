"use client";

import { Issue, User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssignIssue = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useQuery<User[]>(useUsers);

  const AssignUser = (userId: String) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId !== " " ? userId : null,
      })
      .catch(() => toast.error("Changes couldn't be saved"));
  };

  if (error) return null;

  if (isLoading) return <Skeleton className="h-6" />;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || " "}
        onValueChange={AssignUser}
      >
        <Select.Trigger placeholder="Assign" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestion</Select.Label>
            <Select.Item value=" ">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = {
  queryKey: ["users"],
  queryFn: () => axios.get("/api/users").then((res) => res.data),
  staleTime: 60 * 1000,
  retry: 3,
};

export default AssignIssue;
