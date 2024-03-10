"use client";

import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";

const Navbar = () => {
  return (
    <nav className="py-3 border-b mb-5 text-xl px-2">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="4">
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <Flex>
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues/list",
    },
  ];
  const curPath = usePathname();

  return (
    <Flex gap={"4"}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={classNames({
            "!text-black": link.href === curPath,
            "nav-link": true,
          })}
        >
          {link.label}
        </Link>
      ))}
    </Flex>
  );
};

const AuthStatus = () => {
  const { status, data } = useSession();

  if (status === "unauthenticated")
    return (
      <Link href={"/api/auth/signin"} className="nav-link">
        Login
      </Link>
    );

  if (status === "loading") return <Skeleton width="3rem" />;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={data!.user!.image!}
          fallback="?"
          radius="full"
          className="cursor-pointer"
          size={"2"}
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>{data!.user!.email!}</DropdownMenu.Label>
        <Link href={"/api/auth/signout"}>
          <DropdownMenu.Item>Logout</DropdownMenu.Item>
        </Link>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Navbar;
