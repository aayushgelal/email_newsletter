"use client"
const Editor = dynamic(() => import('../_components/MyEditor'), {
  ssr: false,
});
import { useSession } from 'next-auth/react';
import React, { useState, useRef } from 'react';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';
import FloatingButton from '../_components/FloatingButton';
import { Send, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import dynamic from "next/dynamic";

export default function NewPost() {
  const { data: session } = useSession();
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const editorRef = useRef<typeof Editor.defaultProps>(null);
  const mail = api.mail.sendMail.useMutation();

  const handleSelection = (idea: string) => {
    if (editorRef.current) {
      const editor = editorRef.current.getInstance();
      editor.insertText(idea);
    }
  };

  const handlePublish = () => {
    if (editorRef.current) {
      const editor = editorRef.current.getInstance();
      const content = editor.getHTML();
      toast.promise(
        mail.mutateAsync({ subject: title, message: content }),
        {
          loading: 'Sending newsletter...',
          success: 'Newsletter sent successfully!',
          error: 'Failed to send newsletter',
        }

      )
    
    }
  };

  return (
    <div className="max-w-screen h-screen mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className='mb-6 flex justify-between'>
        <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Newsletter</h1>
        <p className="text-gray-600">Craft your message and reach your audience.</p>
        </div>
      <div className='mt-6 flex space-x-6 items-center'>
        <Button variant="outline" className="flex items-center">
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </Button>
        <Button 
          disabled={!session?.user?.email} 
          onClick={handlePublish}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Send className="mr-2 h-4 w-4" />
          Publish Newsletter
        </Button>
      </div>

      </div>

      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter newsletter title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Editor 
        ref={editorRef}
        initialValue="Start writing your newsletter here..."   
        previewStyle="vertical"
        height="500px"
        initialEditType="wsiwyg"
        useCommandShortcut={true}
        className="border border-gray-300 rounded-md overflow-hidden"
      />

      <FloatingButton onSelectIdea={handleSelection} />
    </div>
  );
}