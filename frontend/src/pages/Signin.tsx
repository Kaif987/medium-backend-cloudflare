import { Auth } from "@/components/ui/Auth"
import { Quote } from "@/components/ui/Quote"

export function Signin() {
    return (
        <div className="grid w-full h-screen lg:grid-cols-2 lg:gap-0">
            <Auth type="signin" />
            <Quote />
        </div>
    )
}
