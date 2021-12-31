import {v4 as uuidv4} from 'uuid'

export class CartItem {
    id: string
    willBuy: boolean

    constructor(public description: string, public price: number) {
        this.id = uuidv4()
        this.willBuy = false
    }
}