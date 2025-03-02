import { Date } from './IDate.ts';

export interface Post {
    id_post: number;
    title: string;
    content_short: string;
    content_full: string;
    date_create: Date;
}