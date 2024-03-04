import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const Issues = () => {
  return (
    <div className="flex flex-col justify-center gap-4">
      Issues
      <Link href={"/issues/new"}>
        <Button>Create new Issue</Button>
      </Link>
    </div>
  );
};

export default Issues;
