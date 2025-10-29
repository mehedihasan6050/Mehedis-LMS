"use client"

import { useState, useTransition } from "react"
import { Eye, EyeOff, Github, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { authClient } from "@/lib/auth-cllient"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { SignUpSchema } from "@/lib/schemas"



type SignUpFormValues = z.infer<typeof SignUpSchema>

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition,] = useTransition()
  const [googleLoading, startGoogleTransition,] = useTransition()
  const [githubLoading, startGitHubTransition,] = useTransition()
  const router = useRouter()

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: SignUpFormValues) => {
    console.log("Form submitted:", values)

    startTransition(async() => {
      await authClient.signUp.email({
        name: values.firstName + " " + values.lastName,
        email: values.email,
        password: values.password,
      },{
          onSuccess: () => {
            toast.success("Account created successfully!.") 
            router.push('/')
          },
          onError: (error) => {
            toast.error(`Sign up failed: ${error.error.message}`)
          }

        })
      })
  }
  
  
  const signInWithGoogle = () => {
    startGoogleTransition(async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
    fetchOptions: {
      onSuccess: () => {
        toast.success("Singed in with Google, you will be redirected...") 
      },
      onError: (error) => {
        toast.error(error.error.message)
      }
    }
  });
  })
  };
  
    const signInWithGitHub = () => {
    startGitHubTransition(async () => {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/",
    fetchOptions: {
      onSuccess: () => {
        toast.success("Singed in with Github, you will be redirected...") 
      },
      onError: (error) => {
        toast.error(error.error.message)
      }
    }
  });
  })
};
  

    return (
      <div className="min-h-screen flex">
        {/* Left Section - Gradient Background */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden">
          
          

          <div className="relative z-10 text-center">
            {/* Logo */}
            <div className="mb-12">
              <div className="text-white text-5xl font-light tracking-tight">
                <span className="inline-block mr-2 text-primary font-bold">Mehedi</span>Academy
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-white text-4xl font-bold mb-6 leading-tight max-w-3xl">
              Revolutionizing Education with Modern LMS Platform.
            </h1>

            {/* Subheading */}
            <p className="text-white text-lg font-light">Creating amazing learning journeys for 1000+ users every day.</p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 bg-background flex flex-col justify-center items-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-foreground text-3xl font-bold mb-2">Create your account</h2>
              <p className="text-muted-foreground text-sm">Join To Learing Start today</p>
            </div>

            {/* Social Sign-in Buttons */}
            <div className="space-y-3 mb-8">
              <Button onClick={signInWithGoogle} variant="outline" className="w-full flex items-center justify-center cursor-pointer gap-3 bg-transparent">
                {googleLoading ? <><Loader2 className="size-4 animate-spin" /> Loading...</> : <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
                </>}
              </Button>

              <Button onClick={signInWithGitHub} variant="outline" className="w-full cursor-pointer flex items-center justify-center gap-3 bg-transparent">
                {githubLoading ? <> <Loader2 className="animate-spin w-5 h-5"/> Loading... </>: <><Github className="size-4" />
                Sign in with Github</>}
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-background text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-0">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground text-sm font-medium">First name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              className="bg-muted border-border text-foreground placeholder-muted-foreground"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground text-sm font-medium">Last name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
                              className="bg-muted border-border text-foreground placeholder-muted-foreground"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground text-sm font-medium">Email address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                            className="bg-muted border-border text-foreground placeholder-muted-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground text-sm font-medium">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Choose your password"
                              className="bg-muted border-border text-foreground placeholder-muted-foreground pr-12"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button disabled={isPending} type="submit" className="w-full cursor-pointer font-semibold py-3 mt-6">
                    {isPending ? <>
                     <Loader2 className="animate-spin"/> Loading...
                    </> : "Create account"}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Footer Text */}
            <p className="text-center text-muted-foreground text-xs mt-6">
              By continuing, you agree to our{" "}
              <a href="#" className="text-foreground hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-foreground hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    )}

