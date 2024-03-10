"use client";

import {
  QueryClient,
  QueryClientProvider as ReactClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const client = new QueryClient();
  return <ReactClientProvider client={client}>{children}</ReactClientProvider>;
};

export default QueryClientProvider;
