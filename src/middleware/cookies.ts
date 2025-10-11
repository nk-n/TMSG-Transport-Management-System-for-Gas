'use server'
 
import { cookies } from 'next/headers'
 
export async function create(data:string) {
  const cookieStore = await cookies()
 
  cookieStore.set({
    name: 'jwt',
    value: data,
    httpOnly: true,
    path: '/',

  })
}

export async function getCookies() : Promise<string>{
    const cookieStore = await cookies()
    const jwt : string = cookieStore.get('jwt')?.value ?? ""
  return jwt
}