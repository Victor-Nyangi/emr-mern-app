import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns/format";
import { destroyCookie, setCookie } from "nookies";
import { twMerge } from "tailwind-merge";
import {
  EMAIL,
  USER_ID,
  ACCESS_TOKEN,
  NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/utilities/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setCookieWithDefaults = (name: string, value: string) => {
  setCookie(null, name, value, {
    maxAge: SESSION_MAX_AGE_SECONDS,
    sameSite: "strict",
    path: "/",
  });
};

export const formatDateFn = (date: string) => {
  return format(date, "LLL dd, y");
};

export const formatTimeFn = (timeStamp: any) => {
  const modifiedTimestamp = Number(timeStamp);
  const modifiedDate = new Date(modifiedTimestamp);
  const isValidDate = !isNaN(modifiedDate.getTime());

  return isValidDate ? format(modifiedDate, "PPPp") : "Invalid date";
};

export const constructUserName = (user: {
  salutation: string;
  first_name: string;
  last_name: string;
}) => {
  return `${user?.salutation ?? ""}. ${user?.first_name ?? ""} ${
    user?.last_name ?? ""
  }`.trim();
};

export const signOut = () => {
  [ACCESS_TOKEN, USER_ID, EMAIL, NAME].forEach((cookie) =>
    destroyCookie(null, cookie)
  );
};
