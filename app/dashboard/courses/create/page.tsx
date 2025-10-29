"use client"

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories, CourseSchema, CourseSchemaType, status } from '@/lib/schemas';
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, PlusIcon, SparkleIcon } from 'lucide-react';
import Link from 'next/link';
import {  useForm } from 'react-hook-form';
import slugify from 'slugify';
import { useState, useTransition } from 'react';
import { levels } from '@/lib/schemas';
import Editor from '@/components/text-editor/editor';
import Uploader from '@/components/file-uploader/uploader';
import { tryCatch } from '@/lib/try-catch';
import { createCourse } from '@/lib/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Create = () => {
  const [slugging, setSlugging] = useState(false);
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 0,
      category: "Technology",
      slug: "",
      status: "Draft",
      fileKey: "",
      level: "Beginner",
      price: 0,
    },
  })

  const [isPending, startTransition] = useTransition()
  const router = useRouter()


  function onSubmit(values: CourseSchemaType) {
     console.log(values)
     // Do something with the form values.
    startTransition(async () => {
      const { data, error } = await tryCatch(createCourse(values))
      if (error) {
        toast.error('An Errror Ocurret On CLinet')
        return
      }

      if (data.status === 'success') {
        toast.success(data.message)
        form.reset()
        router.push('/dashboard/courses')
      } else if (data.status === 'error') {
        toast.error(data.message)
      }

     })
  }

  return (
    <div>
      <div className='my-4 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Create Course</h1>
        <Link href='/dashboard/courses' className={buttonVariants({
          variant: "outline", size: "sm"
        })}>Go Courses Page</Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Provide information about a new Course</CardDescription>
        </CardHeader>

      <CardContent>
       
           <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField control={form.control} name='title' render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='enter your title' {...field} />
                  </FormControl>
                </FormItem>
              )}>
                
              </FormField>

              <div className='flex items-end gap-4'>
                 <FormField control={form.control} name='slug' render={({field}) => (
                <FormItem className='w-full'>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder='Slug' {...field} />
                  </FormControl>
                </FormItem>
              )}>
                
                </FormField>
            <Button
  type="button"
  onClick={() => {
    setSlugging(true); 

    setTimeout(() => {
      const titleValue = form.getValues("title");
      const generatedSlug = slugify(titleValue);
      form.setValue("slug", generatedSlug, { shouldValidate: true });
      setSlugging(false); 
    }, 2000);
  }}
>
  {slugging ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Generating...
                    </>
  ) : (
    <>
      Generate Slug <SparkleIcon className="size-4 ml-1" />
    </>
  )}
</Button>

              </div>
              
                 <FormField control={form.control} name='description' render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Editor field={field} />
                  </FormControl>
                </FormItem>
              )}>
                
              </FormField>
              
               <FormField control={form.control} name='fileKey' render={({field}) => (
                <FormItem>
                  <FormLabel>Thumbnail image</FormLabel>
                  <FormControl>
                   <Uploader value={field.value} onChange={field.onChange}/>
                  </FormControl>
                </FormItem>
              )}>
                
              </FormField>


              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
<FormField control={form.control} name='category' render={({field}) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder="Select a category">

                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                 </Select>
                </FormItem>
              )}>
                
                </FormField>
                
                <FormField control={form.control} name='level' render={({field}) => (
                <FormItem>
                  <FormLabel>Course Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder="Select a level">

                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                 </Select>
                </FormItem>
              )}>
                
                </FormField>
                

                   <FormField control={form.control} name='duration' render={({field}) => (
                <FormItem>
                  <FormLabel>Course Duration (hours)</FormLabel>
                  <FormControl>
                    <Input placeholder='enter your course duration' {...field} type='number' onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                </FormItem>
              )}>
                
                </FormField>
                
                 <FormField control={form.control} name='price' render={({field}) => (
                <FormItem>
                  <FormLabel>Course Price</FormLabel>
                  <FormControl>
                    <Input placeholder='enter your course price' {...field} type='number' onChange={(e) => field.onChange(Number(e.target.value))}/>
                  </FormControl>
                </FormItem>
              )}>
                
              </FormField>
              </div>
               <FormField control={form.control} name='status' render={({field}) => (
                <FormItem>
                  <FormLabel>Course Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder="Select a Status">

                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {status.map((val) => (
                          <SelectItem key={val} value={val}>{val}</SelectItem>
                        ))}
                      </SelectContent>
                 </Select>
                </FormItem>
              )}>
                
              </FormField>
              

              <Button disabled={isPending} className='w-full' type='submit'> {isPending ? <>
              <Loader2 className='size-4 animate-spin'/> Loading...
              </> : <>
              <PlusIcon className='size-4' /> Create Course</>}</Button>
          </form>
          </Form>
      </CardContent>
      </Card>
    </div>
  );
};

export default Create;