export const getDate = (date: number) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"]
    let d = new Date(date),
    year = d.getFullYear(),
    month = months[d.getMonth()],
    // month = d.getMonth() + 1,
    day = d.getDate();

    // if (month.length < 2) 
    //     month = '0' + month;

    return `${month} ${day} ${year}`
}

export const getTime = (date: number) => {
    let d = new Date(date);
    let hour = String(d.getHours());
    let min = String(d.getMinutes());

    if (hour.length < 2)
        hour = '0' + hour;
    if (min.length < 2)
        min = '0' + min;

    return `${hour}:${min}`
}