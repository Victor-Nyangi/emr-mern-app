"use client";

import { useState } from "react";
import { LoginPayload } from "@/types/data";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { ACCESS_TOKEN, EMAIL, NAME, USER_ID } from "@utilities/constants";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { setCookieWithDefaults } from "@/lib/utils";
import { loginSubmitHandler } from "@/utilities/api";
import { toast } from "sonner";

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const [userDetails, setUserDetails] = useState<LoginPayload>({
    email: "gichuivictor@gmail.com",
    password: "gichuivictor@gmail.com",
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const isValid = () => {
    return [userDetails.email, userDetails.password].includes("");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      console.log(userDetails, 'userDetails')
      const data = await loginSubmitHandler({ ...userDetails });
      // check if unsuccessful Login

      if (!data?.token) {
        toast.error("Login Error", {
          description:
            data?.error_description || "There was a problem with your request.",
        });

        setUserDetails((prev) => ({
          ...prev,
          email: "",
          password: "",
        }));
      } else {
        const userData = {
          [ACCESS_TOKEN]: data?.token,
          [USER_ID]: data?._id,
          [EMAIL]: data?.email,
          [NAME]: data?.name,
        };

        Object.entries(userData).forEach(([key, value]) =>
          setCookieWithDefaults(key, value)
        );

        toast.promise(data, {
          loading: "Loading...",
          success: (res: any) => {
            return "Successfully logged In";
          },
          error: "There was a problem with your request.",
        });

        router.push(`/home`);
      }
    } catch (error) {
      toast.error("Login Error", {
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            method="POST"
            onSubmit={(e) => {
              return handleSubmit(e);
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username/Email address</Label>
                <Input
                  type="email"
                  placeholder="Please enter your username/email"
                  id="email"
                  autoComplete="email"
                  value={userDetails.email}
                  required
                  className="h-10"
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="flex items-center rounded-md border border-slate-300 pr-2">
                  <Input
                    placeholder="Please enter your password"
                    autoComplete="password"
                    className="h-10 border-none"
                    data-testid="password"
                    value={userDetails.password}
                    required
                    onChange={(e) =>
                      setUserDetails((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="show-password"
                  >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading || isValid()}
                className="flex w-full justify-center"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
