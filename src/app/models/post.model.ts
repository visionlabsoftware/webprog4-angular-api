import { Reactions } from "./reactions.model";

export interface Post {
    body: string,
    id: undefined;
    reactions : Reactions;
    tags : string[];
    title: string;
    userId: number;
    views: number;
}