import { Button } from "@/components/ui/button"
import { useBlogs } from "@/hooks/useBlogs"
import { BlogCard } from "@/components/ui/BlogCard"
import { Appbar } from "@/components/ui/Appbar"
import { BlogCardSkeleton } from "@/components/ui/BlogCardSkeleton"

export function Blogs() {
    const { loading, blogs } = useBlogs()
    const loadingBlogs = Array(4).fill(0)

    return (
        <>
            <Appbar />
            <section className="w-full py-10 md:py-24 lg:py-16">
                <div className="container px-4 md:px-6">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest from our writers</h2>
                            <Button variant="link">View all blogs</Button>
                        </div>
                        <div className="grid gap-6">
                            {loading && loadingBlogs.map(() => {
                                return <BlogCardSkeleton />
                            })}
                            {blogs && blogs.map(({ id, title, content, author, thumbnail }) => {
                                return <BlogCard id={id} title={title} content={content.slice(0, 200)} name={author.name} thumbnail={thumbnail} />
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}