import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Signup() {
    return (
        <div className="grid w-full h-screen lg:grid-cols-2 lg:gap-0">
            <div className="flex items-center justify-center bg-gray-100 p-6 lg:p-10 dark:bg-gray-800">
                <div className="mx-auto w-full max-w-[400px] space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Sign Up</h1>
                        <p className="text-gray-500 dark:text-gray-400">Create your account to start blogging.</p>
                    </div>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>
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
        </div>
    )
}