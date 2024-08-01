"use client"
import * as React from "react"
import { HomeIcon, Calendar, CalendarPlus, CopyPlus, Mail, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"


export function SideBar() {
  const router = useRouter()
  const { data: session } = useSession()

  const Items = [
    { name: "New Post", icon: CopyPlus, path: "/dashboard/newpost" },
    { name: "Scheduled Posts", icon: CalendarPlus, path: "/dashboard/schedule" },
    { name: "Subscribers Email", icon: Mail, path: "/dashboard/subscribers" }
  ]

  return (
    <div className="h-screen bg-white shadow-md border-r p-5 flex flex-col">
      <div className="flex items-center justify-center mb-8">
        <Image src={'/emailify.png'} alt="Logo" width={200} height={200} />
      </div>

      <nav className="flex-grow">
        {Items.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.path)}
            className="flex items-center w-full gap-3 rounded-lg cursor-pointer hover:bg-gray-100 p-3 mb-2 transition-colors duration-200"
          >
            <item.icon size={20} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{item.name}</span>
          </button>
        ))}
      </nav>

      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full flex items-center justify-start p-3 hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={'/default-avatar.png'}
                    alt="User avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">{session.user.name}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => router.push('/api/auth/signin')} className="w-full">
          Sign In
        </Button>
      )}
    </div>
  )
}