"use client";

import { useState } from "react";
import { LoginPayload, SignupPayload } from "@/types/data";
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

const RegistrationForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const [userDetails, setUserDetails] = useState<SignupPayload>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const isValid = () => {
    return [userDetails.name, userDetails.email, userDetails.password].includes(
      ""
    );
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e?.preventDefault();
    setIsLoading(true);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  placeholder="Please enter your name"
                  id="name"
                  autoComplete="name"
                  value={userDetails.name}
                  required
                  className="h-10"
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  type="email"
                  placeholder="Please enter your email"
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

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password2">Confirm Password</Label>
                </div>
                <div className="flex items-center rounded-md border border-slate-300 pr-2">
                  <Input
                    placeholder="Please enter your password again"
                    autoComplete="password2"
                    className="h-10 border-none"
                    data-testid="password2"
                    value={userDetails.password2}
                    required
                    onChange={(e) =>
                      setUserDetails((prev) => ({
                        ...prev,
                        password2: e.target.value,
                      }))
                    }
                    type={showPassword2 ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword2(!showPassword2)}
                    data-testid="show-password"
                  >
                    {showPassword2 ? <EyeIcon /> : <EyeOffIcon />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading || isValid()}
                className="flex w-full justify-center"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Have an account?{" "}
              <Link href="/" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
