import { Appbar } from "@/components/ui/Appbar";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URI } from "@/config";
import axios from "axios";
import { useState } from "react";
import { CreateBlogSchemaType } from "@kaif-siddiqui/common";
import { useAuth } from "@/hooks/useAuth";

export function Create() {
    const navigate = useNavigate()
    const [postData, setPostData] = useState<CreateBlogSchemaType>({
        title: "",
        content: "",
        thumbnail: ""
    })
    const { user } = useAuth()

    const publish = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(`${BACKEND_URI}/api/v1/blog`)
        axios.post(`${BACKEND_URI}/api/v1/blog`, postData, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${user?.authToken}`
            }
        })
            .then(response => response.data)
            .then(data => navigate("/blog/" + data.id))
    }

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = new FormData()
        if (e.target.files) {
            data.append("file", e.target.files[0])
        }
        data.append("upload_preset", "qakdo7bs")
        data.append("cloud_name", "dpozqg5ei")

        fetch("  https://api.cloudinary.com/v1_1/dpozqg5ei/image/upload", {
            method: "post", body: data
        }).then(resp => resp.json())
            .then(data => { setPostData(prev => ({ ...prev, thumbnail: data.url })) })
            .catch(err => console.log(err))
    }


    return (
        <div className="flex flex-col min-h-screen">
            <Appbar />
            <main className="flex-1 py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <form className="mx-auto max-w-3xl space-y-8" onSubmit={publish}>
                        <div>
                            <Label htmlFor="title" className="block text-lg font-semibold">
                                Title
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter your blog post title"
                                className="mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 shadow-sm transition-colors focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-600 dark:focus:ring-gray-600"
                                onChange={e => setPostData(prev => ({ ...prev, title: e.target.value }))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="content" className="block text-lg font-semibold">
                                Content
                            </Label>
                            <Textarea
                                id="content"
                                rows={15}
                                placeholder="Start writing your blog post content here..."
                                className="mt-2 w-full resize-none rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-900 shadow-sm transition-colors focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-600 dark:focus:ring-gray-600"
                                onChange={e => setPostData(prev => ({ ...prev, content: e.target.value }))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="title" className="block text-lg font-semibold">
                                Thumbnail Image
                            </Label>
                            <Input
                                id="title"
                                type="file"
                                placeholder="Enter your blog post title"
                                className=""
                                onChange={uploadImage}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="rounded-md bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-950"
                            >
                                Publish
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
            <footer className="bg-gray-100 py-6 dark:bg-gray-800">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:gap-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2024 Acme Blog. All rights reserved.</p>
                    <nav className="flex gap-4">
                        <Link
                            to="#"
                            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        >
                            Privacy
                        </Link>
                        <Link
                            to="#"
                            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        >
                            Terms
                        </Link>
                        <Link
                            to="#"
                            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    )
}
