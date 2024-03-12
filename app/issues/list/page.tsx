import { Issue, Status } from "@prisma/client";
import GetIssue from "./GetIssue";
import IssueActions from "./IssueActions";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; sort: "asc" | "desc" };
}

const IssuesPage = ({ searchParams }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-4">
      <IssueActions />
      <GetIssue
        curstatus={searchParams.status}
        orderBy={searchParams.orderBy}
        sort={searchParams.sort}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
