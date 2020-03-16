import { Bonus } from './bonus';

export interface User {    
    uId: string;
    username: string
    email: string
    password: string
    photoUrl: string
    uBonus?: Bonus[]
    uMedal?: string[]
} 