import { BlogSkeleton } from "@/components/ui/BlogSkeleton"
import { useBlog } from "@/hooks/useBlog"
import { useParams } from "react-router-dom"

export function Blog() {
    const { id } = useParams()
    const { loading, blog } = useBlog({ id: id || "" })

    if (loading || !blog) {
        return <BlogSkeleton />
    }

    return (
        <div className="container mx-auto grid grid-cols-1 gap-8 py-12 md:grid-cols-3 md:gap-12 lg:py-16">
            <article className="col-span-2 prose prose-gray max-w-none dark:prose-invert">
                <div className="space-y-2 not-prose">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{blog.title}</h1>
                    <p className="text-gray-500 dark:text-gray-400">Published on June 1, 2023</p>
                </div>
                <div>
                    {blog.content}
                </div>
            </article>
            <div className="space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Author</h2>
                    <div className="space-y-1">
                        <h3 className="text-xl font-medium">{blog.author.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Jane Doe is a technology writer and AI enthusiast. She has been covering the latest advancements in
                            artificial intelligence for the past 5 years, exploring both the opportunities and challenges it presents.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}