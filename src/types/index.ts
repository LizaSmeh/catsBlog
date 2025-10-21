export interface Comment {
    id: number;
    text: string;
    user: string;
    createdAt: string;
}

export interface Post {
    id: number;
    titel: string;
    image: string;
    content: string;
    comments: Comment[];
    createdAt: string;
}