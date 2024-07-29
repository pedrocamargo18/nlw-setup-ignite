import dayjs from "dayjs";

export function GenerateDatesFromYearBeginning(){
    const firstDayOfTheYear = dayjs().startOf('year')
    const today = new Date()

    const dates = []

    let compareDate = firstDayOfTheYear 

    while( compareDate.isBefore(today)){
        dates.push(compareDate.toDate())
        //Ta adicionando 1 dia a mais 
        compareDate = compareDate.add(1, 'day')
    }

    return dates
}