import { Post } from "../models/post.model";

export interface Posts{
    limit : number;
    posts : Post[];
    skip : number;
    total : number;
}