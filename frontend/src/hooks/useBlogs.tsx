import { useEffect, useState } from "react"
import { BACKEND_URI } from "@/config"
import axios from "axios"
import { useAuth } from "./useAuth"

interface BlogType {
    id: string,
    title: string,
    content: string,
    thumbnail: string,
    author: {
        name: string | null
    }
}

export function useBlogs() {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<BlogType[]>()
    const { user } = useAuth()

    console.log({ user })

    useEffect(() => {
        axios.get(`${BACKEND_URI}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${user?.authToken}`
            }
        })
            .then(response => response.data)
            .then((data) => {
                setLoading(false)
                setBlogs(data.posts)
            })
    }, [user])

    return { loading, blogs }
}
