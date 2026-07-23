import { MedicalApplicationAdmin } from "@/components/medical-application-admin";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminMedicalDetailPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-8">
      <MedicalApplicationAdmin id={id} />
    </main>
  );
}
