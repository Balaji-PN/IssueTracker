import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

const newIssuePageLoading = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton height={"20rem"} />
    </Box>
  );
};

export default newIssuePageLoading;
