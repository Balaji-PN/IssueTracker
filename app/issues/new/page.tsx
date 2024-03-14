import React from "react";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssue = () => {
  return <IssueForm />;
};

export default NewIssue;

export const metadata: Metadata = {
  title: "Create new Issue",
  description: "Creating the new issue on the project",
};
