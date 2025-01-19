import { Comment } from "../models/comment.model";

export interface Comments {
    comments: Comment[];
    total: number;
    skip: number;
    limit: number;
  }