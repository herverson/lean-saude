import { ReactNode } from "react";

interface ClientsLayoutProps {
  children: ReactNode;
}

export default function ClientsLayout({ children }: ClientsLayoutProps) {
  return <div>{children}</div>;
}
