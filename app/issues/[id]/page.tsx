import authOptions from "@/app/auth/authOptions";
import { IssueStatusBadge } from "@/app/components/";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import IssueActions from "./IssueActions";
import AssignIssue from "./AssignIssue";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  const details = await prisma!.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

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
          <AssignIssue />
          <IssueActions detailsId={details.id} />
        </Flex>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
