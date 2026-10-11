import AuthCard from "@/components/auth/AuthCard";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthCard
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
      footerText="অ্যাকাউন্ট আছে?"
      footerLinkText="সাইন ইন করুন"
      footerLinkHref="/sign-in"
    >
      <SignUpForm />
    </AuthCard>
  );
}