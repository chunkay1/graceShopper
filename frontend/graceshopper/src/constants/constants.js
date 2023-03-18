export const setTargetValue = (callback) => {
    return (event) => {
        callback(event.target.value)
    }
}

//used for one of the homepage carousels
export const categories = [

    {
        category: 'Shoes',
        image: 'category-shoes3.png',
        siteCategory: 'Shoes'
    },
    {
        category: 'Outdoor Clothing',
        image: 'category-clothing3.png',
        siteCategory: 'Clothing'
    },
    {
        category: 'Tents',
        image: 'category-tents3.png',
        siteCategory: 'Tents'
    },
    {
        category: 'Firepits and Grills',
        image: 'category-firepits-and-grills3.png',
        siteCategory: 'Firepits and Grills'
    },
    {
        category: 'Skiing',
        image: 'category-skiing3.png',
        siteCategory: 'Skis'
    },
    {
        category: 'Snowboarding',
        image: 'category-snowboarding3.png',
        siteCategory: 'Snowboards'
    },
]

export const STORAGE_KEY = 'replyToken';
export const BASEURL = 'http://localhost:5500/api'