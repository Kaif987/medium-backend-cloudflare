import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "./button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth";

export function Appbar() {
    const { user, logout } = useAuth()
    const name = user?.name || "Anonymous"

    return (
        <nav className="flex justify-between p-5">
            <Link to="/blogs" className="font-medium text-xl">
                Medium
            </Link>
            <div className="flex items-center gap-4 ">
                <Link to='/create'>
                    <Button>
                        Publish
                    </Button>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={logout}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}
