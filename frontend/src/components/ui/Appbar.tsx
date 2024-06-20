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

export function Appbar() {
    const name = localStorage.getItem("email") || "Anonymous"
    const navigate = useNavigate()

    const signOut = () => {
        localStorage.removeItem("token")
        navigate("/signin")
    }

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
                        <DropdownMenuItem onClick={() => signOut()}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}
