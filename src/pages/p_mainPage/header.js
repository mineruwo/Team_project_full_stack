$(document).ready(() => {

    console.log("Header Load");
    
    let isLoginUser = isLogin();
    
    $("#mypage").click(() => {
        if (!isLogin()) {
            window.location.href = "../p_loginPage/logIn_signUp.html";
            return;
        }

        window.location.href = "../p_myPage/myPage.html";
    });


    $("#cart").click(() => {
        if (!isLogin()) {
            window.location.href = "../p_loginPage/logIn_signUp.html";
            return;
        }

        window.location.href = "../p_productDetail/order_cart.html";
    });

    $(".login>li")[0].innerHTML = `${isLoginUser ? "로그아웃" : "로그인"}`;

    $(".login").click(function () {

        if (isLoginUser) {
            userLogout();
            alert("로그아웃 되었습니다.");
            console.log(isLoginUser);
            window.location.href = "../p_mainPage/index.html";
            return;
        }
        else {
            location.href = "../p_loginPage/login_signUp.html";
        }
    });

});