import { ButtonComp } from "@/app/components";
import GetIssue from "./GetIssue";

const IssuesPage = () => {
  return (
    <div className="flex flex-col justify-center gap-4">
      <ButtonComp name="Create New Issue" link="/issues/new" />
      <GetIssue />
    </div>
  );
};

export default IssuesPage;
