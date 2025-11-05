export interface Comment {
    id: string;
    text: string;
    user: string;
    createdAt: string;
}

export interface Post {
    id: string;
    titel: string;
    image: string;
    content: string;
    authorId: string;
    authorEmail: string; 
    comments: Record<string, Comment>;
    createdAt: string;
    likes?: Record<string, boolean>; 
    dislikes?: Record<string, boolean>; 
    
}