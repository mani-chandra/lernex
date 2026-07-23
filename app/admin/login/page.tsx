import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin-login-form";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-12">
      <h1 className="mb-6 text-center text-2xl font-bold">Lernex admin</h1>
      <Suspense fallback={<p className="text-center text-sm">Loading…</p>}>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
