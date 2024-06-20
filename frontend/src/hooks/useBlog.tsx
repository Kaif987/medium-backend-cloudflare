import { useEffect, useState } from "react"
import { BACKEND_URI } from "@/config"
import axios from "axios"

interface BlogType {
    id: string,
    title: string,
    content: string,
    published: boolean,
    author: {
        name: string | null
    }
}

export function useBlog({ id }: { id: string }) {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<BlogType>()

    useEffect(() => {
        axios.get(`${BACKEND_URI}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.data)
            .then((data) => {
                setLoading(false)
                setBlog(data.post)
            })
    }, [])

    return { loading, blog }
}
