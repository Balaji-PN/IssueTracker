"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  const curPath = usePathname();
  return (
    <nav className="flex items-center gap-8 px-4 h-16 border-b mb-5 text-xl">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={classNames({
            "text-zinc-400": link.href !== curPath,
            "text-black": link.href === curPath,
            "hover:text-black transition-colors": true,
          })}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
