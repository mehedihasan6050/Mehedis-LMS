"use client"


import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Icon } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
  }) {
  
  const pathname = usePathname()
  
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        
        <SidebarMenu>
         
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
               <Link className={`${pathname === item.url ? 'bg-blue-500' : ''}`} href={item.url}> {item.icon && <item.icon />}
                <span>{item.title}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
