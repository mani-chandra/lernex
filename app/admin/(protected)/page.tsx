import { auth, signOut } from "@/auth";
import { AdminDashboard } from "@/components/admin-dashboard";
import { Button } from "@/components/button";

export default async function AdminPage() {
  const session = await auth();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admissions dashboard</h1>
          <p className="text-sm text-zinc-600">Signed in as {session?.user?.email}</p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <Button type="submit" variant="secondary">
            Sign out
          </Button>
        </form>
      </div>
      <AdminDashboard />
    </main>
  );
}
