'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Manu from './manu'

const Editor = ({field}: any) => {
  const editor = useEditor({
    extensions: [StarterKit ,  TextAlign.configure({
        types: ['heading', 'paragraph'],
    })],
    editorProps: {
      attributes: {
        class: "min-h-[200px] p-4 focus:outline-none prose dark:prose-invert max-w-full prose sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none"
      }
    },
    onUpdate: ({editor}) => {
      field.onChange(JSON.stringify(editor.getJSON()))
    },
    content: field.value ? JSON.parse(field.value) : '<p>Type anything...</p>',
    immediatelyRender: false
  })

  return (
    <div className='w-full border border-input rounded-lg overflow-hidden dark:bg-input/30'>
      <Manu editor={editor} />
      <EditorContent editor={editor}/>
    </div>

  )
}

export default Editor