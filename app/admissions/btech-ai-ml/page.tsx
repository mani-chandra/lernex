import { PublicLayout } from "@/components/public-layout";
import { BtechApplicationForm } from "@/components/btech-application-form";

export default function BtechAdmissionsPage() {
  return (
    <PublicLayout
      title="B.Tech AI/ML registration"
      description="Free registration — our admissions team will contact you after you submit this form."
    >
      <BtechApplicationForm />
    </PublicLayout>
  );
}
