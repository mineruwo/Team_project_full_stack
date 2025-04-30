$(document).ready(() => {
    initialize();
});

//#region Common Area
function initialize() {
    let isInit = window.localStorage.getItem('initialize');

    if (isInit == 'true') {
        console.log('localStorage is Init');
        return;
    }

    console.log('localStorage is clear and Init');
    window.localStorage.clear();
    window.localStorage.setItem('initialize', 'true');
}
function createResponseMessage(isSuccess, resMessage, code) {

    let response = {
        'isSuccess': isSuccess,
        'resMessage': resMessage,
        'responseCode': code
    }

    return response;
}

function localStorageClearAll() {
    console.log("clear all");
    window.localStorage.clear();
}

//#endregion

//#region User Area
function currentLoginInfo() {
    let loginInfo = window.localStorage.getItem('currentLogin');

    if(loginInfo == undefined)
    {
        return null;
    }

    let info = getUserInfo(loginInfo);
    return info;
}

function getUserInfo(rawData) {
    let jsonData =  JSON.parse(rawData);
    return jsonData;
}

function isLogin() {
    return window.localStorage.getItem('currentLogin') == undefined ? false : true;
}

function registerUser(id, pw, name, birthday, phonenum, email) {
    let userObject = createUserInfoObject(id, pw, name, birthday, phonenum, email);

    addUser(userObject);

    return createResponseMessage(true, "가입 완료", 200);
}

function createUserInfoObject(id, pw, name, birthday, phonenum, email) {
    var returnObject =
    {
        "id": id,
        "password": pw,
        "birthday": birthday,
        "phonenumber": phonenum,
        "email": email,
        "name": name,
        "nickname": "",
        "isDelete": "false",
        "orderList": [],
        "refundList" : [],
        "csList" : [], 
    }

    return returnObject;
}

function addUser(userinfoObject) {
    let jsonData = getUserList();

    userinfoObject.index = jsonData.userList.length;

    jsonData.userList.push(userinfoObject);

    let rawData = JSON.stringify(jsonData);

    window.localStorage.setItem('userList', rawData);

}

function getUserList() {

    //let readJson = fetch("../../json/userList.json");

    let readJson = window.localStorage.getItem('userList');

    if (readJson == null) {
        let defaultUserList = '{userList:[]}'
        readJson = defaultUserList;
        window.localStorage.setItem('userList', defaultUserList);
    }

    return JSON.parse(readJson);
}
//이거 쓰지 마세요. private method 입니다.
function IDCheck(id) {
    let jsonData = getUserList();
    const idList = jsonData.userList.map((element) => element.id);

    if (idList.includes(id)) {
        return true;
    }

    return false;
}

function idDupCheck(id) {
    let isDuplicate = IDCheck(id);

    if (isDuplicate) {
        return createResponseMessage(false, "중복된 값이 존재합니다.", 500);
    }

    return createResponseMessage(true, "가입 완료", 200);
}

function loginUser(id, pw) {
    let userList = getUserList().userList;

    let userID = userList.find((element) => element.id == id);

    if (userID == undefined) {
        return createResponseMessage(false, "생성된 아이디가 존재하지 않습니다.", 500);
    }

    if (userID.password != pw) {
        return createResponseMessage(false, "비밀번호가 다릅니다.", 501);
    }

    let rawData = JSON.stringify(userID);

    window.localStorage.setItem('currentLogin', rawData);

    return createResponseMessage(true, "로그인 되었습니다.", 200);
}

function removeUser(removeUserId) {
    let jsonData = getUserList();

    jsonData.userList.forEach((element, index) => {
        if (element.id == removeUserId) {
            jsonData.userList.splice(index, 1);
        }
    });

    let rawData = JSON.stringify(jsonData);

    console.log("remove Done after");
    console.log(jsonData);
    window.localStorage.setItem('userList', rawData);
}

function userLogout()
{
    window.localStorage.setItem('currentLogin', undefined);
}




//#endregion

//#region Cart & Product Area
function showCartList() {
    let list = getCartList();

    return list;
}

function getCartList() {
    let cartList = window.localStorage.getItem("cartList");

    if (cartList == null) {

        let empty = [];

        window.localStorage.setItem("cartList", JSON.stringify(empty));
        cartList = window.localStorage.getItem("cartList");
    }

    return cartList;
}

function addCartItem(index) {
    let cartList = getCartList();

    console.log(cartList);
    cartList.push(index);

    window.localStorage.setItem("cartList", cartList);
}

function removeCartItem(productIndex) {
    let cartList = getCartList();

    cartList.forEach((element, index) => {
        if (element == productIndex) {
            jsonData.userList.splice(index, 1);
        }
    });

    window.localStorage.setItem("cartList", cartList);
}

function removeAllCart() {
    window.localStorage.setItem("cartList", []);
}

async function getProductInfo(index) {
    let productList = await getProductList();

    let productInfo = productList.productList.find(element => element.index == index);
    return productInfo;
}

async function getProductList() {
    let readJson = await fetch("../../json/productList.json");
    let jsonData = await readJson.json();

    return jsonData;
}


//#endregion

//#region User Info Modity
function modifyNickname(modifyNickname) {
    let currentLoginUser = currentLoginInfo();

    let jsonData = getUserList();

    let findUserIndex = jsonData.userList.findIndex(element=> element.index == currentLoginUser.index);

    if (findUserIndex == -1) {
        console.log("해당 유저를 찾을 수 없습니다.");
        return;
    }
    currentLoginUser.nickname = modifyNickname;

    jsonData.userList[findUserIndex] = currentLoginUser;

    let rawData = JSON.stringify(jsonData);

    window.localStorage.setItem('userList', rawData);
}

function modifyUserInfo(phonenumber, email) {
    let currentLoginUser = currentLoginInfo();

    let jsonData = getUserList();

    let findUserIndex = jsonData.userList.findIndex(element=> element.index == currentLoginUser.index);

    if (findUserIndex == -1) {
        console.log("해당 유저를 찾을 수 없습니다.");
        return;
    }

    if (phonenumber != "") {
        currentLoginUser.phonenumber = phonenumber;
    }

    if (email != "") {
        currentLoginUser.email = email;
    }

    jsonData.userList[findUserIndex] = currentLoginUser;

    let rawData = JSON.stringify(jsonData);

    window.localStorage.setItem('userList', rawData);

    
    let rawCurrentUserData = JSON.stringify(currentLoginUser);

    window.localStorage.setItem('currentLogin', rawCurrentUserData);
}

function modifyProfilePhoto() {

}

function modifyAddress(address) {
    let currentLoginUser = currentLoginInfo();

    let jsonData = getUserList();

    let findUserIndex = jsonData.userList.findIndex(element=> element.index == currentLoginUser.index);

    if (findUserIndex == -1) {
        console.log("해당 유저를 찾을 수 없습니다.");
        return;
    }

    if (address != "") {
        console.log(address);
        currentLoginUser.address = address;
    }

    jsonData.userList[findUserIndex] = currentLoginUser;

    let rawData = JSON.stringify(jsonData);

    window.localStorage.setItem('userList', rawData);

    let rawCurrentUserData = JSON.stringify(currentLoginUser);

    window.localStorage.setItem('currentLogin', rawCurrentUserData);
}

//#endregion