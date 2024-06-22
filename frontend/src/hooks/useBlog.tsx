import { useEffect, useState } from "react"
import { BACKEND_URI } from "@/config"
import axios from "axios"
import { useAuth } from "./useAuth"

interface BlogType {
    id: string,
    title: string,
    content: string,
    published: boolean,
    comments: [{
        id: string,
        comment: string,
        commentator: {
            name: string,
            id: string
        }
    }],
    author: {
        name: string | null
    }
}

export function useBlog({ id }: { id: string }) {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<BlogType>()
    const { user } = useAuth()

    useEffect(() => {
        axios.get(`${BACKEND_URI}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${user?.authToken}`
            }
        })
            .then(response => response.data)
            .then((data) => {
                setLoading(false)
                setBlog(data.post)
            })
    }, [user])

    return { loading, blog }
}
