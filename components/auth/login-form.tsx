'use client';

import { useState } from "react";
import { LoginPayload } from "@/types/data";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

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

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const [userDetails, setUserDetails] = useState<LoginPayload>({
    username: "gichuivictor@gmail.com",
    password: "gichuivictor@gmail.com",
  });

  const [isLoading, setIsLoading] = useState(false);

  const isValid = () => {
    return [userDetails.username, userDetails.password].includes("");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e?.preventDefault();
    setIsLoading(true);
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
                  placeholder="Please enter your username"
                  id="username"
                  autoComplete="username"
                  value={userDetails.username}
                  required
                  className="h-10"
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      username: e.target.value,
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
