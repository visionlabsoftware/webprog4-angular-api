import { User } from "./user.model";

export interface Comment {
    id: undefined;
    body: string;
    postId: number;
    likes: number;
    user: User;
  }