"use client";

import { ButtonComp } from "@/app/components";
import { Status } from "@prisma/client";
import { Flex, Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statuses: { label: String; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueActions = () => {
  const router = useRouter();

  return (
    <Flex justify="between">
      <Select.Root
        onValueChange={(status) => {
          const query = status ? `?status=${status}` : undefined;
          router.push(`/issues/list${query}`);
        }}
      >
        <Select.Trigger placeholder="Filter By Status..." />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value || " "}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <ButtonComp name="Create New Issue" link="/issues/new" />
    </Flex>
  );
};

export default IssueActions;
