import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Card, Flex, Heading } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const details = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  await delay(2000);

  if (!details) return notFound();

  return (
    <div>
      <Heading>{details.title}</Heading>
      <Flex gap={"2"} my={"3"}>
        <IssueStatusBadge status={details.status} />
        <p>{details.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose">
        <ReactMarkdown>{details.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
