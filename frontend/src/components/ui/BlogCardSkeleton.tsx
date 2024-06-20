import { Skeleton } from "./skeleton"

export function BlogCardSkeleton() {
    return (
        <div className="flex gap-2">
            <div className="flex flex-col gap-4 w-full">
                <div className="flex gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="w-full h-12" />
                </div>
                <div className="flex flex-col gap-4 ">
                    <Skeleton className="w-[125px] h-12" />
                    <Skeleton className="w-full h-36" />
                </div>
            </div>
            <Skeleton className="h-[300px] w-[300px]" />
        </div>
    )
}
