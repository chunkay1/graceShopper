export const setTargetValue = (callback) => {
    return (event) => {
        callback(event.target.value)
    }
}

//used for one of the homepage carousels
export const categories = [

    {
        category: 'Shoes',
        image: 'category-shoes3.png'
    },
    {
        category: 'Outdoor Clothing',
        image: 'category-clothing3.png'
    },
    {
        category: 'Skiing',
        image: 'category-skiing3.png'
    },
    {
        category: 'Snowboarding',
        image: 'category-snowboarding3.png'
    },
    {
        category: 'Kayaking',
        image: 'category-kayaking3.png'
    }
]

export const STORAGE_KEY = 'replyToken';
export const BASEURL = 'http://localhost:5500/api'