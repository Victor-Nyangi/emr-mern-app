import { parseCookies } from "nookies";
import React, { useEffect } from "react";
import { ACCESS_TOKEN } from "@/utilities/constants";
import { useRouter } from "next/navigation";
import Loader from "../layout/loaders/loader";

interface Props {
  children?: React.ReactNode;
}
const WithAuth = ({ children }: Props) => {
  const router = useRouter();
  const isAuth = parseCookies()[ACCESS_TOKEN];

  useEffect(() => {
    if (!isAuth) router.push("/");
  }, [isAuth]);

  if (!isAuth) {
    return (
      <div
        className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
        data-testid={"loader"}
      >
        <Loader loadingText="Validating Session" />
      </div>
    );
  }
  return <>{children}</>;
};

export default WithAuth;
