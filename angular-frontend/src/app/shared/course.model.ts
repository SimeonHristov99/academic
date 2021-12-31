import { v4 as uuidv4 } from 'uuid'

export class Course {
    id: string
    price: number
    url: URL
    rating: number
    duration: number

    constructor(
        public title: string,
        public description: string,
        public organization: string,
        public level: string,
        url: string,
        price: number,
        raiting: number,
        duration: number
    ) {
        this.id = uuidv4()
        this.url = new URL(url)

        this.price = (price < 0 ? 0 : price)
        this.rating = (2 <= raiting && raiting <= 5 ? raiting : 2)
        this.duration = (duration <= 0 ? 1 : duration)
    }
}