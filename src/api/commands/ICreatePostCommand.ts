export interface CreatePostCommand {
    title: string
    description: string
    isPinned: boolean | false
    id_user: number
}