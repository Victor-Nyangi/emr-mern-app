"use server";

import { LoginPayload, PayloadT } from "@/types/data";

import { ACCESS_TOKEN } from "./constants";
import { LOGIN_ENDPOINT, SERVER_URL } from "./endpoints";
import { cookies } from "next/headers";

/**
 * Everything in this module is a Server Action -- the "use server"
 * directive above makes each export one, whether it is called from a
 * server component or a client component.
 *
 * Two consequences drive the shape of this file:
 *
 *  1. Cookies must be read through next/headers. `nookies.parseCookies()`
 *     falls back to `document.cookie`, which does not exist here, so it
 *     returns {} and the request goes out as `Bearer undefined`. That is
 *     what every mutation was doing.
 *
 *  2. No client-only libraries. Calling sonner's toast here does nothing
 *     at all, which is why those failed requests were invisible. Errors
 *     are thrown instead and reported by the calling component.
 */

const readToken = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN)?.value ?? "";
};

const buildHeaders = async (requiresAuth: boolean) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (requiresAuth) {
    headers.Authorization = `Bearer ${await readToken()}`;
  }

  return headers;
};

/**
 * Turns a non-OK response into an Error carrying the server's message.
 *
 * The API answers every error as JSON { message }. Parsing defensively
 * anyway: a proxy or gateway failure can still return HTML, and that
 * must surface as a useful error rather than a JSON parse crash.
 */
const toError = async (response: Response): Promise<Error> => {
  let message = `Request failed: ${response.status} ${response.statusText}`;

  try {
    const body = await response.json();
    if (body?.message) message = body.message;
  } catch {
    // Non-JSON body; keep the status-based message.
  }

  if (response.status === 401) {
    return new Error(message || "Your session has expired. Please sign in again.");
  }

  return new Error(message);
};

/**
 * Reusable function used to resolve data fetching promise and handle errors
 * @param url URL endpoint
 * @returns parsed response body
 */
export const apiHandler = async (url: string, requiresAuth: boolean = true) => {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    credentials: "include",
    headers: await buildHeaders(requiresAuth),
  });

  if (!response.ok) {
    throw await toError(response);
  }

  return response.json();
};

/**
 * Reusable function used to resolve data posting promise and handle errors
 * @param url URL endpoint
 * @returns parsed response body
 */
export const postHandler = async (
  url: string,
  requiresAuth: boolean = true,
  payload: PayloadT,
  method: string = "POST"
) => {
  const response = await fetch(url, {
    method: method,
    cache: "no-cache",
    credentials: "include",
    headers: await buildHeaders(requiresAuth),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await toError(response);
  }

  return response.json();
};

/**
 * AUTH ENDPOINTS
 */
/**
 * @param email the email address
 * @param password the password
 * @returns login response
 */
export const loginSubmitHandler = async ({ email, password }: LoginPayload) => {
  const response = await fetch(SERVER_URL + LOGIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // Login is the one case where the caller wants the body either way: it
  // renders the server's reason for rejecting the credentials.
  return response.json();
};

/**
 * @returns list of specified data
 * @throws when the request fails, so callers can render an error state
 *   instead of an empty list. This previously returned { results: [] } on
 *   failure, which rendered a backend outage as an empty table.
 */
export const getData = async (ENDPOINT: string) => {
  return apiHandler(SERVER_URL + ENDPOINT, true);
};

/**
 * @returns list of specified data to support react query data fetch
 */
export async function getDataRq<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

/**
 * Function that handles post requests
 * @returns post request response
 * @throws when the request fails, carrying the server's message
 */
export const postData = async (
  ENDPOINT: string,
  payload: PayloadT,
  method: string = "POST"
) => {
  return postHandler(SERVER_URL + ENDPOINT, true, payload, method);
};
