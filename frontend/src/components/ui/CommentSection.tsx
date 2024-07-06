import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import axios from "axios"
import { BACKEND_URI } from "@/config"
import { useParams } from "react-router-dom"
import { useRef, useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"

type CommentSectionProps = {
    postId: string,
    comments: CommentStructure[]
}

type CommentStructure = {
    comment: string,
    id: string,
    commentator: {
        name: string | null,
        id: string
    }
}

export function CommentSection({ comments, postId }: CommentSectionProps) {
    const [commentValue, setCommentValue] = useState<string>("")
    const [commentsArray, setCommentsArray] = useState<CommentStructure[]>(comments)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [currentEditedCommentId, setCurrentEditedCommentId] = useState<string>("")
    const commentBoxRef = useRef<HTMLTextAreaElement>(null)
    const { user } = useAuth()

    const { id } = useParams()

    const postComment = async () => {
        if (!user || !user.id) {
            console.error("User or user ID is not defined")
            return;
        }


        const response = await axios.post(`${BACKEND_URI}/api/v1/comment`, {
            postId: id,
            comment: commentValue
        }, {
            headers: {
                Authorization: `Bearer ${user?.authToken}`
            }
        })
        console.log(response.data)

        setCommentsArray(prev => [...prev, {
            comment: commentValue,
            id: response.data.id,
            commentator: {
                id: user?.id,
                name: response.data.commentator || "Anonymous",
            }
        }])

        setCommentValue("")
    }

    const editComment = (id: string, comment: string) => {
        commentBoxRef.current?.focus()
        setEditMode(true)
        setCommentValue(comment)
        setCurrentEditedCommentId(id)
    }

    const postEditedComment = async () => {
        try {
            if (!user || !user.id) {
                console.error("User or user ID is not defined")
                return;
            }

            const response = await axios.put(`${BACKEND_URI}/api/v1/comment`, {
                id: currentEditedCommentId,
                postId: postId,
                comment: commentValue
            }, {
                headers: {
                    Authorization: `Bearer ${user?.authToken}`
                }
            })
            console.log(response.data)

            setCommentsArray(prev => {
                return prev.map(comment => {
                    if (comment.id !== currentEditedCommentId) {
                        return comment
                    } else {
                        return {
                            comment: commentValue,
                            id: currentEditedCommentId,
                            commentator: {
                                id: user?.id,
                                name: comment.commentator.name || "Anonymous",
                            }
                        }
                    }
                })
            })

            setCommentValue("")
            setCurrentEditedCommentId("")
            setEditMode(false)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteComment = async (id: string) => {
        try {
            const response = await axios.delete(`${BACKEND_URI}/api/v1/comment/${id}`, {
                headers: {
                    Authorization: `Bearer ${user?.authToken}`
                }
            })

            console.log(response.data)
            setCommentsArray(prevComments => {
                return prevComments.filter(comment => comment.id !== id)
            })

        } catch (error) {
            console.log()
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 space-y-8 col-span-1 md:col-span-2">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Comments</h2>
                <div className="grid gap-2">
                    <Textarea
                        placeholder="Write your comment..."
                        className="resize-none min-h-[100px] rounded-md border border-input px-4 py-3 text-sm shadow-sm"
                        value={commentValue}
                        onChange={e => setCommentValue(e.target.value)}
                        ref={commentBoxRef}
                    />
                    {editMode ?
                        <Button type="submit" className="justify-self-end"
                            onClick={postEditedComment}
                        >
                            Edit Comment
                        </Button>
                        :
                        <Button type="submit" className="justify-self-end"
                            onClick={postComment}
                        >
                            Post Comment
                        </Button>
                    }
                </div>
            </div>
            <div className="space-y-6">
                {commentsArray.map(comment => {
                    return <div key={comment.id} className="flex items-start gap-4">
                        <Avatar className="w-10 h-10 border">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>{comment.commentator.name ? comment.commentator.name[0].toUpperCase() : "A"}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1.5 flex-1">
                            <div className="flex items-center gap-2">
                                <div className="font-medium">{comment.commentator.name || "Anonymous"}</div>
                                <div className="text-xs text-muted-foreground">2 days ago</div>
                                {comment.commentator.id === user?.id && (
                                    <div className="ml-auto flex items-center gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                    </svg>
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Button variant="ghost" onClick={() => editComment(comment.id, comment.comment)}>
                                                        <span className="">Edit</span>
                                                    </Button>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Button variant="destructive" onClick={() => deleteComment(comment.id)}>
                                                        <span className="">Delete</span>
                                                    </Button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )}
                            </div>
                            <div className="text-muted-foreground">
                                {comment.comment}
                            </div>

                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}