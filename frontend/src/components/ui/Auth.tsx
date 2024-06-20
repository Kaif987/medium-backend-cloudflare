import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SignupType } from "@kaif-siddiqui/common"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { BACKEND_URI } from "@/config"



export function Auth({ type }: { type: "signup" | "signin" }) {
    const navigate = useNavigate()

    const [postInputs, setPostInputs] = useState<SignupType>({
        email: "",
        name: "",
        password: ""
    })

    const sendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BACKEND_URI}/api/v1/user/${type}`,
                postInputs
            )
            const data = response.data
            localStorage.setItem("token", data.jwt)
            localStorage.setItem("email", postInputs.email || "")

            navigate("/blogs")
        } catch (error) {
            alert("an error occured" + error)
        }
    }

    return (
        <div className="flex items-center justify-center bg-gray-100 p-6 lg:p-10 dark:bg-gray-800">
            <div className="mx-auto w-full max-w-[400px] space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">{type === "signup" ? "Sign Up" : "Sign in"}</h1>
                    <p className="text-gray-500 dark:text-gray-400">{type == "signup" ? "Create your account to start blogging." : "Log in to your account to start blogging"}</p>
                </div>
                <form className="space-y-4" onSubmit={sendRequest}>
                    {type === "signup" &&
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="John Doe" required onChange={e => setPostInputs(prevInputs => ({ ...prevInputs, name: e.target.value }))} />
                        </div>
                    }
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required onChange={e => setPostInputs(prevInputs => ({ ...prevInputs, email: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required onChange={e => setPostInputs(prevInputs => ({ ...prevInputs, password: e.target.value }))} />
                    </div>
                    <Button type="submit" className="w-full">
                        {type === "signup" ? "Sign Up" : "Sign In"}
                    </Button>
                </form>
                {type === "signup" ?
                    <p className="text-center">Already have an account?  <Link to="/signin" className="font-bold hover:underline">Sign in</Link></p>
                    :
                    <p className="text-center">Don't have an account?  <Link to='/signup' className="font-bold hover:underline">Sign up</Link></p>
                }
            </div>
        </div>
    )
}
