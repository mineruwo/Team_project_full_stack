function bakeCookie(key, keyNum, val, date) {
    return key + keyNum + "=" + val + ";path=/;expires=" + date + ";";
}
function parseCookie(str) {
    let cookieStr = document.cookie;
    let cookieArr = cookieStr.split("; ");
    let arr = [];
    for(let cyc in cookieArr) {
        if(cookieArr[cyc].indexOf(str) != -1) {
            arr.push(cookieArr[cyc]);
        }
    }
    return arr;
}