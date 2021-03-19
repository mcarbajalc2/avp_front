export default class Misc{
    static getDate(){
        var d = new Date();

        const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
        const year = d.getFullYear()
        const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() +1

        return `${year}-${month}-${date}`
    }

    static isEmpty(value){
        if(
            value === undefined || 
            value === null ||
            (typeof value === 'string' && value.trim() === '')
        ){
            return true
        }
        return false
    }

    static isRUC(value){
        const expreg = new RegExp(/^[0-9]{11,11}$/)
        if(expreg.test(value)){
            return true
        }
        return false
    }
}