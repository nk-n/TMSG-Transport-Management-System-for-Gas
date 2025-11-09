"use server";

import { cookies } from "next/headers";

export async function create(data: string, name: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: name,
    value: data,
    httpOnly: true,
    path: "/",
  });
}

export async function getCookies(name: string): Promise<string> {
  const cookieStore = await cookies();
  const jwt: string = cookieStore.get(name)?.value ?? "";
  return jwt;
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete({ name: name, path: "/" });
}
