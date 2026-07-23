import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }
  return children;
}
