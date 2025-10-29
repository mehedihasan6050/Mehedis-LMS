"use server"
import { CourseSchema, CourseSchemaType } from '@/lib/schemas';
import prisma from './db';
import { ApiRespone } from './types';
import { auth } from './auth';
import { headers } from 'next/headers';

export async function createCourse(values: CourseSchemaType) : Promise<ApiRespone> {
  try {
    const session = await auth.api.getSession({
    headers: await headers()
  })
  const validation = CourseSchema.safeParse(values)
  if (!validation.success) {
    return {
      status: 'error',
      message: 'Invalid Form Data'
    }
  }

  await prisma.course.create({
    data: {
      ...validation.data,
      userId: session?.user.id as string
    }
  })

  return {
    status: 'success',
    message: 'Course Created Successfully',
  }
} catch  {
  return {
    status: 'error',
    message: 'Course Created Faild'
  }
}
}