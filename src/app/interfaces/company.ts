import { Bonus } from './bonus';

export interface Company {
    cId: string
    cName: string
    cDescrition: string
    cSum: number
    countBonus?: Bonus
    cSubj: string
    cTag?: string
    cVideo?: any
    cArt?: any
    cEndDate: Date
    rating: any
}