import AuthCard from "@/components/auth/AuthCard";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <AuthCard
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
      footerText="অ্যাকাউন্ট নেই?"
      footerLinkText="সাইন আপ করুন"
      footerLinkHref="/sign-up"
    >
      <SignInForm />
    </AuthCard>
  );
}