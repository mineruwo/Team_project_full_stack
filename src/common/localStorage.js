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
    return loginInfo == undefined ? null : loginInfo;
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
        let defaultUserList = '{"userList":[{"index":0,"id":"mineruwo","password":"12345aa!","phonenumber":"","birthday":"","name":"손민우","email":"","nickname":"미노","address":"","isDelete":"false","orderList":[{"orderDate":"20250424","productName":"와이드 원턱 스웨트 쇼츠 블랙","productOption":"2(XL-2XL)","companyName":"모즈모즈","currentState":"배송중","imageUrl":"../../image/itemsImage/1.webp","productindex":1},{"orderDate":"20250424","productName":"원턱 린넨 라이크 와이드 밴딩 팬츠_Oatmeal","productOption":"L","companyName":"무드인사이드","currentState":"배송중","imageUrl":"../../image/itemsImage/2.webp","productindex":2},{"orderDate":"20250424","productName":"아메리칸 시리즈 DET 반팔 티셔츠 WHITE","productOption":"XL","companyName":"웨스트 그랜드 블러바드","currentState":"배송중","imageUrl":"../../image/itemsImage/3.webp","productindex":3},{"orderDate":"20250421","productName":"빈티지 워싱 갤러리 클럽 후드 집업_블랙","productOption":"M","companyName":"레이몬트","currentState":"배송완료","imageUrl":"../../image/itemsImage/4.webp","productindex":4},{"orderDate":"20250421","productName":"CORP TEE BLACK(MG2DMMT509A)","productOption":"블랙, 3(XL)","companyName":"마하그리드","currentState":"배송완료","imageUrl":"../../image/itemsImage/5.webp","productindex":5},{"orderDate":"20250421","productName":"프론트 플랩 셔링 미니 백팩_블랙","productOption":"없음","companyName":"모즈모즈","currentState":"배송완료","imageUrl":"../../image/itemsImage/6.webp","productindex":6},{"orderDate":"20250421","productName":"와이드 원턱 스웨트 쇼츠 블랙","productOption":"2(XL-2XL)","companyName":"모즈모즈","currentState":"배송완료","imageUrl":"../../image/itemsImage/7.webp","productindex":7},{"orderDate":"20250418","productName":"[무료반품]레볼루션 7 M - 블랙:오프 누와르 / FB2207-005","productOption":"275","companyName":"나이키","currentState":"배송완료","imageUrl":"../../image/itemsImage/8.webp","productindex":8},{"orderDate":"20250418","productName":"러닝 컴프레션 레깅스 하프 타이즈","productOption":"L","companyName":"러닝라이프","currentState":"배송완료","imageUrl":"../../image/itemsImage/9.webp","productindex":9},{"orderDate":"20250418","productName":"에센셜 라운드 니트 가디건 - 5 COLOR","productOption":"그레이 , L","companyName":"수아레","currentState":"배송완료","imageUrl":"../../image/itemsImage/10.webp","productindex":10}]},{"id":"mino","password":"aaa12!","birthday":"19940913","phonenumber":"01049503013","email":"mineruwo@gmail.com","name":"미노","nickname":"","isDelete":"false","orderList":[],"index":0}]}';
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

    return createResponseMessage(true, "아이디 사용이 가능합니다.", 200);
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

    window.localStorage.setItem('currentLogin', userID);

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
function removeAllUser()
{
    let empty = {
        userList : []
    };

    let rawdata = JSON.stringify(empty);

    window.localStorage.setItem('userList', rawdata);
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
        window.localStorage.setItem("cartList", []);
        cartList = window.localStorage.getItem("cartList");
    }

    return cartList;
}

function addCartItem(index) {
    let cartList = getCartList();

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

    console.log(productList.productList);

    let productInfo = productList.productList.find(element => element.index == index);

    console.log(productInfo);
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

    let findUserIndex = jsonData.userList.indexOf(currentLoginUser);

    if (findUserIndex == -1) {
        console.log("해당 유저를 찾을 수 없습니다.");
        return;
    }
    currentLoginUser.nickname = modifyNickname;

    jsonData.userList[findUserIndex] = currentLoginUser;

    let rawData = JSON.stringify(jsonData);

    window.localStorage.setItem('userList', rawData);
}

function modifyUserInfo(name, birthday, phonenumber, email) {
    let currentLoginUser = currentLoginInfo();

    let jsonData = getUserList();

    let findUserIndex = jsonData.userList.indexOf(currentLoginUser);

    if (findUserIndex == -1) {
        console.log("해당 유저를 찾을 수 없습니다.");
        return;
    }

    if (name != "") {
        currentLoginUser.name = name;
    }

    if (birthday != "") {
        currentLoginUser.birthday = birthday;
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
}

function modifyProfilePhoto() {

}

function modifyAddress(address) {
    let currentLoginUser = currentLoginInfo();

    let jsonData = getUserList();

    let findUserIndex = jsonData.userList.indexOf(currentLoginUser);

    if (findUserIndex == -1) {
        console.log("해당 유저를 찾을 수 없습니다.");
        return;
    }

    if (address != "") {
        currentLoginUser.address = address;
    }

    jsonData.userList[findUserIndex] = currentLoginUser;

    let rawData = JSON.stringify(jsonData);

    window.localStorage.setItem('userList', rawData);
}

//#endregion