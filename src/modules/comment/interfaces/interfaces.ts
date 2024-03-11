import { CommentsEntity } from "src/database/entities/comments.entity";
import { IGlobalResponse } from "src/shared/interfaces/interfaces";

interface ICommentsResponseContent {
    message: string,
    content?: CommentsEntity | CommentsEntity[]
}

export interface ICommentsResponse extends IGlobalResponse {
    data: ICommentsResponseContent 
}