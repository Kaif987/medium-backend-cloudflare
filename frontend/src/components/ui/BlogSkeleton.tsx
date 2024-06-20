import { Skeleton } from "./skeleton"

export function BlogSkeleton() {
    return (
        <div className="container mx-auto grid grid-cols-1 gap-8 py-12 md:grid-cols-3 md:gap-12 lg:py-16">
            <div className="col-span-2 prose prose-gray max-w-none dark:prose-invert">
                <div className="flex flex-col  gap-4">
                    <Skeleton className="w-full h-16" />
                    <div className="flex flex-col gap-4">
                        <Skeleton className="w-1/3 h-12" />
                        <Skeleton className="w-full h-96" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-[300px] w-full" />
            </div>
        </div>
    )
}
