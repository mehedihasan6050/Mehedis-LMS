import { z } from "zod"

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})


export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

 export const categories = ["Math", "Science", "History", "Art", "Technology"] as const
 export const status = ["draft", "published", "archived"] as const
export const levels = ["beginner", "intermediate", "advanced"] as const


export const createCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 hour").max(500, "Duration must be less than 500 hours"),
  category: z.enum(categories, {message: "Invalid category"
  }),
  slug: z.string().min(1, "Slug is required"),
  status: z.enum(status, { message: "Invalid status" }),
  fileKey: z.string().min(1, "File key is required"),
  level: z.enum(levels, { message: "Invalid level" }),
  price: z.coerce.number().min(0, "Price must be at least 0"),
})



// server side validation schemas
export const uploadFileSchema = z.object({
  fileName: z.string().min(1, {message: "File name is required"}),
  contentType: z.string().min(1, { message: "Content type is required" }),
  size: z.number().min(1, { message: "File size must be at least 1 byte" }),
  isImage: z.boolean()
})