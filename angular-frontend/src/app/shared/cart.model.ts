import {v4 as uuidv4} from 'uuid'

export class CartItem {
    id: string
    willBuy: boolean

    constructor(public text: string) {
        this.id = uuidv4()
        this.willBuy = false
    }
}