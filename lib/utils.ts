import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns/format";
import { setCookie } from "nookies";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setCookieWithDefaults = (name: string, value: string) => {
  setCookie(null, name, value, {
    maxAge: 60 * 60,
    sameSite: "strict",
    path: "/",
  });
};

export const formatDateFn = (date: string) => {
  return format(date, "LLL dd, y");
};
