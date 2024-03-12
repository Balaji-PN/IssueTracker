import { IssueStatusBadge } from "@/app/components";
import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  curstatus: Status;
  orderBy: keyof Issue;
  sort: "asc" | "desc";
  page: string;
}

const GetIssue = async ({ curstatus, orderBy, sort, page }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(curstatus) ? curstatus : undefined;

  const curpage = parseInt(page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: { [orderBy]: sort },
    skip: (curpage - 1) * 10,
    take: pageSize,
  });

  let colcur: string;
  let cur = () => {
    sort === "asc" ? (colcur = "desc") : (colcur = "asc");
  };
  cur();

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <Link
                  href={{
                    query: {
                      status: curstatus,
                      orderBy: column.value,
                      sort: colcur,
                    },
                  }}
                  className={column.className}
                >
                  {column.label}
                  {column.value === orderBy && sort === "asc" && (
                    <ArrowUpIcon className="inline mx-2" />
                  )}
                  {column.value === orderBy && sort === "desc" && (
                    <ArrowDownIcon className="inline mx-2" />
                  )}
                </Link>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues?.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={curpage}
        itemCount={issueCount}
        pageSize={pageSize}
        searchParams={{ curstatus, orderBy, sort, page }}
      />
    </>
  );
};

export default GetIssue;
