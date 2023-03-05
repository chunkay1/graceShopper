export const setTargetValue = (callback) => {
    return (event) => {
        callback(event.target.value)
    }
}

export const STORAGE_KEY = 'replyToken';
export const BASEURL = 'http://localhost:5500/api'