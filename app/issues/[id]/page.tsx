import authOptions from "@/app/auth/authOptions";
import { IssueStatusBadge } from "@/app/components/";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import ReactMarkdown from "react-markdown";
import AssignIssue from "./AssignIssue";
import IssueActions from "./IssueActions";

export const dynamic = "force-dynamic";

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const details = await fetchIssue(parseInt(params.id));

  if (!details) return notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <Heading>{details.title}</Heading>
        <Flex gap={"2"} my={"3"}>
          <IssueStatusBadge status={details.status} />
          <p>{details.createdAt.toDateString()}</p>
        </Flex>
        <Card className="prose max-w-full">
          <ReactMarkdown>{details.description}</ReactMarkdown>
        </Card>
      </Box>
      {session && (
        <Flex direction="column" gap="3">
          <AssignIssue issue={details} />
          <IssueActions detailsId={details.id} />
        </Flex>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

export async function generateMetadata({ params }: { params: { id: string } }) {
  console.log("meta data invoked");
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: "Details of the issue " + issue?.id,
    description: "Details the issue " + issue?.title,
  };
}
