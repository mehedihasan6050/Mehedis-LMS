import {
  BoltIcon,
  Home,
  LayoutDashboard,
  LogOutIcon,
  School,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useSignout } from "@/hooks/useSignout"


const navigationLinks = [
  { href: "/", label: "Home", icon: <Home className="opacity-60" aria-hidden="true"/>},
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="opacity-60" aria-hidden="true"/> },
  { href: "/courses", label: "Courses" , icon: <School className="opacity-60" aria-hidden="true"/>},
  
]

interface UserMenuProps {
  email: string,
  name: string,
  image: string
}

export default function UserMenu({ email, name, image }: UserMenuProps) {
  const handleSignout = useSignout()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={image} alt="Profile image" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {name}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {
            navigationLinks.map((link, index) => (
            <DropdownMenuItem key={index} asChild>
                <Link href={link.href}>
                  {link.icon}
              <span>{link.label}</span>
                </Link>
          
          </DropdownMenuItem>
            ))
          }
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
           
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
