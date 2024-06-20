export function Quote() {
    return (
        <div className="flex items-center justify-center bg-gray-100 p-6 lg:p-10 dark:bg-gray-800">
            <div className="mx-auto w-full max-w-[400px] space-y-6">
                <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal">
                    &ldquo;The best way to predict the future is to create it.&rdquo;
                </blockquote>
                <div>
                    <div className="font-semibold">Peter Drucker</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Management Consultant</div>
                </div>
            </div>
        </div>
    )
}
