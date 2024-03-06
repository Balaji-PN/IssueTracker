import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueActions = () => {
  return (
    <Link href={"/issues/new"}>
      <Button>Create new Issue</Button>
    </Link>
  );
};

export default IssueActions;
