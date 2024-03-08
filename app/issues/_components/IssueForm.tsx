"use client";
import { ErrorMsg, Spinner } from "@/app/components";
import { IssueSchema } from "@/app/IssueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = async ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError("An Unexpected Error");
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full gap-4">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <TextField.Root>
        <TextField.Input
          placeholder="title"
          {...register("title")}
          defaultValue={issue?.title}
        />
      </TextField.Root>
      <ErrorMsg>{errors.title?.message}</ErrorMsg>
      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <ErrorMsg>{errors.description?.message}</ErrorMsg>
      <Button disabled={submitting}>
        {issue ? "Update Issue" : "Create new Issue"}{" "}
        {submitting && <Spinner />}
      </Button>
    </form>
  );
};

export default IssueForm;
