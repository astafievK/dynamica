export interface CreatePostCommand {
    title: string
    description: string
    isPinned: boolean | false
    user_id: number
}