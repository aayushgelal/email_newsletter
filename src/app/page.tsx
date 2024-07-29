"use client"
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css';

import React from 'react'
import { Button } from '~/components/ui/button';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');

  
  
}
