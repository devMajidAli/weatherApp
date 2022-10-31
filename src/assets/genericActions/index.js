function conversionToCelciusFromKelvin(tempInKelvin) {
    if (tempInKelvin) {
        return Math.round(tempInKelvin - 273.15)
    }
    else return 0
}
function getUniqueList(data) {
    return [...new Map(data.map((item) => [item.dt_txt.split(" ")[0], item])).values()];
}
function dayOfWeekAsString(dayIndex) {
    return ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"][dayIndex];
}
function getDay(date) {
    var dt = new Date(date)
    return dayOfWeekAsString(dt.getDay());
}
export {
    dayOfWeekAsString,
    getDay,
    getUniqueList,
    conversionToCelciusFromKelvin
}