import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  searchParams: object;
}

const Pagination = ({
  itemCount,
  pageSize,
  currentPage,
  searchParams,
}: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount === 1) return null;

  return (
    <Flex align={"center"} gap={"2"} justify={"center"}>
      <Link href={{ query: { ...searchParams, page: 1 } }}>
        <Button color="gray" variant="soft" disabled={currentPage === 1}>
          <DoubleArrowLeftIcon />
        </Button>
      </Link>
      <Link href={{ query: { ...searchParams, page: currentPage - 1 } }}>
        <Button color="gray" variant="soft" disabled={currentPage === 1}>
          <ChevronLeftIcon />
        </Button>
      </Link>
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Link href={{ query: { ...searchParams, page: currentPage + 1 } }}>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
        >
          <ChevronRightIcon />
        </Button>
      </Link>
      <Link href={{ query: { ...searchParams, page: pageCount } }}>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Link>
    </Flex>
  );
};

export default Pagination;
