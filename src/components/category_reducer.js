export function categoryReducer(catId){
    switch(catId){
        case 2:
            return 'philosophy'
        case 3:
            return 'ethics'
        case 4:
            return 'sociology'
        case 5:
            return 'history'
        case 6:
            return 'spirituality'
        case 7:
            return 'psychology'
        case 8:
            return 'politics'
        case 9:
            return 'law'
        case 10:
            return 'science'
        case 11:
            return 'shariah'
        case 12:
            return 'quran'
        case 13:
            return 'aqeeda'
        default:
            return 'uncategorized'
        
    }
}

export const noCategories = 13;