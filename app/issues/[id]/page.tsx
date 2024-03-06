import { IssueStatusBadge } from "@/app/components/";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const details = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

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
