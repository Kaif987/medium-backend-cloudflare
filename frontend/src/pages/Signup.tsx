import { Auth } from "@/components/ui/Auth"
import { Quote } from "@/components/ui/Quote"

export function Signup() {
    return (
        <div className="grid w-full h-screen lg:grid-cols-2 lg:gap-0">
            <Auth type="signup" />
            <Quote />
        </div>
    )
}