export interface Course {
    _id: string
    rating: number
    title: string
    description: string
    organization: string
    level: string
    price: number
    duration: number
    mark: number
    content: [{
        week: string,
        link: string
      }]
}