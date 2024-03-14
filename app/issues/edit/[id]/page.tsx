import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";
import { cache } from "react";

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const ListIssues = async ({ params }: { params: { id: string } }) => {
  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) return notFound();
  return <IssueForm issue={issue} />;
};

export default ListIssues;

export async function generateMetaData({ params }: { params: { id: string } }) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: `Edit issue ${issue?.id}`,
    description: `Edit the issue ${issue?.title}`,
  };
}
