import { Date } from './IDate.ts';

export interface Post {
    id_post: number;
    title: string;
    description: string;
    date: Date;
    isPinned: boolean;
    user_id: number;
}