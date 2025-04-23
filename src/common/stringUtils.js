function nameEncrypt(name) {
    //문자열 예외 처리 문자열이 아닐 경우 빈값 리턴

    if (typeof name !== 'string') return "";

    let returnName = "";
    let splName = name.split();
    let splfirst = splName[0];

    //이름이 2글자일 경우 체크해서 리턴
    if (splName.length == 2) {
        returnName = `${splfirst}*`;
        return returnName;
    }

    //이름의 마지막 글자 체크
    let splLast = splName[splName.length - 1];
    returnName += splfirst;

    //중간을 *로 채움
    for (let i = 1; i < splName.length - 1; i++) {
        returnName += "*";
    }

    returnName += splLast;
    return returnName;
}

function birthEncrypt(birthDay) {
    let checkDay = ""
    if (typeof birthDay !== 'string') {
        checkDay = birthDay.toString();
    }
    else {
        checkDay = birthDay;
    }


    let returnBir = "";
    try {
        let year = checkDay.slice(0, 4);
        let month = checkDay.slice(5, 6);
        let day = checkDay.slice(7, 8);

        let splyear = year.split();
        splyear.pop();
        splyear.push("X");

        returnBir = `${splyear.join()}.XX.XX`;
    }
    catch {
        console.log("올바르지 않은 값이 입력되었습니다.");
        return "";
    }

    return returnBir;
}

function phoneNumEncrypt(number) {
    let checkNumber = "";
    if (typeof number !== 'string') {
        checkNumber = number.toString();
    }
    else {
        checkNumber = number;
    }

    let returnNum = "";
    checkNumber = checkNumber.replace("-", "");
    try {
        let frontNum = checkNumber.substring(0, 3);
        let midNum = checkNumber.slice(4, checkNumber.length == 11 ? 7 : 6);
        let lastNum = checkNumber.slice(checkNumber.length == 11 ? 8 : 7, checkNumber.length);

        returnNum = `010-${midNum[0]}${midNum.length == 4 ? "***" : "**"}-${lastNum[0]}***`;
    }
    catch {
        console.log("예외 사항이 발생되었습니다 => phoneNumEncrypt()");
        console.log(`입력 값 : ${number}`);
        console.log("기본 값으로 리턴합니다.")
        return "010-****-****";
    }

    return returnNum;
}

function emailAddrEncrypt(mailAddr) {

    if (typeof mailAddr !== 'string') return "";

    let sepIndex = mailAddr.indexOf("@");
    if (sepIndex === -1) return "";
    let mailId = mailAddr.substring(0, sepIndex);

    let hostIndex = mailAddr.indexOf(".", sepIndex + 1);
    if (hostIndex === -1) return "";
    let host = mailAddr.substring(sepIndex + 1, hostIndex);

    let domain = mailAddr.substring(hostIndex + 1, mailAddr.length);

    let idEncrypt = `${mailId[0]}`;

    for (let i = 1; i < mailId.length - 2; i++);
    {
        idEncrypt += "*";
    }

    let hostEncrypt = `${host[0]}`;

    for (let i = 1; i < host.length - 2; i++);
    {
        hostEncrypt += "*";
    }


    let domainEncrypt = `${domain[0]}`;

    for (let i = 1; i < domain.length - 2; i++);
    {
        domainEncrypt += "*";
    }

}

function addrEncrypt(addr) {

    if (typeof addr !== 'string') return "";

    let showFirst = addr.substring(0, 5);

    for (let i = 5; i < addr.length; i++) {
        showFirst += "*";
    }

    return showFirst;
}