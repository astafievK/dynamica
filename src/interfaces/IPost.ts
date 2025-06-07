import { IDate } from './IDate';

export interface Post {
    id_post: number;
    title: string;
    description: string;
    date: IDate;
    isPinned: boolean;
    user_id: number;
}