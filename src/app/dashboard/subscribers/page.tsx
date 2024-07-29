"use client"
import { getSession, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { api } from '~/trpc/react';

const SubscriberList = () => {
  const [email,setEmail]=useState('');
  const subscribers = api.subscribers.getSubscribers.useQuery();
  const addSubscriber = api.subscribers.create.useMutation({
    onSuccess: () => {
      toast.success('Subscriber added successfully!');
      setEmail('');
    },
    onError: (error:Error) => {
      toast.error(`Failed to add subscriber: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSubscriber.mutate({ email: email });
  };


 
  return (
    <div className='max-w-7xl h-screen mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-3xl font-bold mb-8 text-gray-800'>Subscribers List</h1>

      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-10">
        <Input type="email" placeholder="Email" className='flex-grow'/>
        <Button type="submit" className="w-full md:w-auto">Add a new Subscriber</Button>
        <Button type="submit" variant={'outline'} className="w-full md:w-auto">Import</Button>
        <Button type="submit" variant={'outline'} className="w-full md:w-auto">Export</Button>
      </div>

      <div className="overflow-x-auto">
        <table className='w-full text-left table-auto'>
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-gray-600">Email</th>
              <th className="px-4 py-2 text-gray-600">Subscribed Date</th>
              <th className="px-4 py-2 text-gray-600">Mails Sent</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.data && subscribers.data.map((subscriber:any, index:any) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border px-4 py-2">{subscriber.email}</td>
                <td className="border px-4 py-2">{new Date(subscriber.time).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{subscriber.mailSent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {subscribers.data && subscribers.data.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No subscribers found.</p>
      )}
    </div>
  );
};

export default SubscriberList;