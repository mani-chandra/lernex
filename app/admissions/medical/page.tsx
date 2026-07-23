import { PublicLayout } from "@/components/public-layout";
import { MedicalApplicationForm } from "@/components/medical-application-form";
import { RazorpayScript } from "@/components/razorpay-checkout";

export default function MedicalAdmissionsPage() {
  return (
    <>
      <RazorpayScript />
      <PublicLayout
        title="Medical college registration"
        description="Complete your details and pay ₹5,000 to confirm registration. Visit our office for NEET-based counseling."
      >
        <MedicalApplicationForm />
      </PublicLayout>
    </>
  );
}
