import { User } from './user';
import {Company} from './company'

export interface Comment {
    company: Company
    id: string
    message: string
    createdAt: Date
    sender: User
    like?: number
    dislike?: number
}
