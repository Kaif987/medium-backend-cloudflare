import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Link } from "react-router-dom"

interface BlogCardProps {
    id: string,
    title: string,
    content: string,
    name: string | null,
    thumbnail: string
}

export function BlogCard({ id, title, content, name, thumbnail }: BlogCardProps) {
    name = name || "Anonymous"

    return (
        <Link to={`/blog/${id}`}>
            <div className="grid gap-6">
                <div className="grid grid-cols-[1fr_300px] items-start gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Published 3 days ago</div>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold">{title}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{content}...</p>
                    </div>
                    <img
                        src={thumbnail}
                        alt="Blog cover image"
                        width={300}
                        height={300}
                        className="rounded-lg object-cover"
                    />
                </div>
            </div>
        </Link>
    )
}
