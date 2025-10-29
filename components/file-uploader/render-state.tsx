import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";


export function RenderEmptyState({isDragActive}: {isDragActive: boolean}) {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
         <CloudUploadIcon className={cn("size-6 text-muted-foreground" , isDragActive && "text-primary")} />
      </div>
      <p className="text-base font-semibold text-foreground">Drop your files here or <span className="text-primary font-bold cursor-pointer ">click to upload</span></p>
    </div>
  );
}


export function RenderErrorState() {
  return (
    <div className="text-center">
  <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4">
         <ImageIcon className="size-6 text-destructive" />
      </div>
      <p className="tex-base font-semibold">Upload Failed</p>
      <p className="text-xs mt-1 text-muted-foreground">Somthing went worng</p>
     <Button variant="destructive" type="button" className="mt-4">Try Again</Button>
    </div>
  )
}


export function RenderUploadedState({previewUrl , isDelation, handleRemoveFile}: {previewUrl: string, isDelation: boolean, handleRemoveFile: ()=> void}) {
  return (
    <div>
<Image src={previewUrl} alt="Uploaded file" fill className="object-contain p-2"/>
      <Button onClick={handleRemoveFile} variant="destructive" size="icon" className={cn("absolute top-4 right-4")} disabled={isDelation}>
       {isDelation ? <Loader2 className="size-4 animate-spin"/> :  <XIcon className="size-4"/>}
</Button>
    </div>
  )
}

export function RenderUploadingState({ progress, file } : {progress: number, file: File}){
  return (
    <div className="text-center flex justify-center items-center flex-col">

      <p>{progress}</p>
<p className="mt-2 text-sm font-medium text-foreground ">Uploading...</p>
      <p className="mt-2 text-xs text-muted-foreground truncate max-w-xs">{file.name}</p>
    </div>
  )
}