import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <Box>
      <Skeleton height={"2rem"} className="mb-2" />
      <Skeleton height={"20rem"} />
    </Box>
  );
};

export default IssueFormSkeleton;
