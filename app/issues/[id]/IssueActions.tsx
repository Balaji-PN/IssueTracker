"use client";

import { Spinner } from "@/app/components";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Link } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

const IssueActions = ({ detailsId }: { detailsId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const IssueDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issues/" + detailsId);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <Flex direction={"column"} gap={"3"}>
        <Link href={`/issues/edit/${detailsId}`} className="flex">
          <Button className="flex-1">
            <Pencil2Icon />
            Edit Issue{" "}
          </Button>
        </Link>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button color="red" disabled={isDeleting}>
              <MdOutlineDelete size={18} />
              Delete Issue
              {isDeleting && <Spinner />}
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title> Delete Issue</AlertDialog.Title>
            <AlertDialog.Description>
              Are you sure want to Delete this issue? This is can not be undone
            </AlertDialog.Description>
            <Flex mt={"4"} gap={"3"} justify={"end"}>
              <AlertDialog.Cancel>
                <Button color="gray" variant="soft">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button color="red" onClick={IssueDelete}>
                  Delete
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Flex>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error on Deleting</AlertDialog.Title>
          <AlertDialog.Description>
            This is Issue was not deleted currently due to some Problems
          </AlertDialog.Description>
          <AlertDialog.Action>
            <Button
              onClick={() => setError(false)}
              color="gray"
              variant="soft"
              mt={"2"}
            >
              OK
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default IssueActions;
