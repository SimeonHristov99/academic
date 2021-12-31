import { v4 as uuidv4 } from 'uuid'

export class Course {
    id: string
    price: number
    url: URL

    constructor(
        public title: string,
        public description: string,
        url: string,
        price: number,
        public raiting: number,
        public duration: number
    ) {
        this.id = uuidv4()
        this.url = new URL(url)

        this.price = (price < 0 ? 0 : price)
    }
}