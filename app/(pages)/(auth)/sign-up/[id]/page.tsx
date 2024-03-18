import { SignUpForm } from "@/components/form/sign-up-form";
import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SignUp = async () => {
  const session = await getServerSession(authOption);

  if (!session) {
    redirect("/");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="relative">
      <Link href="/" className="absolute -left-16 top-2">
        <Button className="rounded-[50%] h-10 w-10 p-0">
          <ArrowLeft size={24} />
        </Button>
      </Link>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
