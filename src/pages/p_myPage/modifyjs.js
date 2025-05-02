$(document).ready(() => {
    let transEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';
    $("#transitionPage").on(transEnd, () => {

    });

    $("#transitionPage").css(
        {
            "left": "100%",
            "transition": "500ms"
        }
    )

    let currentUser = currentLoginInfo();

    console.log(currentUser);

    $("#nameValue").text(nameEncrypt(`${currentUser.name}`));
    $("#birValue").text(birthEncrypt(`${currentUser.birthday}`));
    $("#phoneValue").text(phoneNumEncrypt(`${currentUser.phonenumber}`));
    $("#mailValue").text(emailAddrEncrypt(`${currentUser.email}`));
    $("#addrValue").text(addrEncrypt(`${currentUser.address}`));
    $("#nickname").text(`${currentUser.nickname} 님`);

    $("#photoChnage").click(() => {
        alert("photoChange (현재 미구현 기능입니다.)");
    });

    const nickModal = document.getElementById('nickNameChange');
    if (nickModal) {
        nickModal.addEventListener('show.bs.modal', event => {

        });
    }


    $("#nickform").submit((evnet) => {
        evnet.preventDefault();
    });


    $("#nickSave").on('click', function () {
        const modalBodyInput = $("#changeNick");
        console.log(modalBodyInput[0]);
        console.log(modalBodyInput[0].value);
        modifyNickname(modalBodyInput[0].value);
        $("#nickname").text(`${modalBodyInput[0].value} 님`);
        $("#nickNameChange").modal('hide');
    });

    $("#PInfomodify").click(() => {
        let option = 'width = 440px, height=600px, left =50px, top = 100px, menubar = no';
        let userModify = window.open('modifyInfo.html', userInfoTable.textContent, option);

        console.log(userModify);
    });

    $("#addrModify").click(() => {

        let option = 'width = 440px, height=600px, left =50px, top = 100px, menubar = no';
        let userModify = window.open('modifyAdress.html', userInfoTable.textContent, option);

        console.log(userModify);
    });


    $("#mypage").click(() => {
        if (!isLogin()) {
            window.location.href = "../p_loginPage/logIn_signUp.html";
            return;
        }

        window.location.href = "../p_myPage/myPage.html";
    });

    $("#unsubscribeButton").click(()=>{
        alert("회원 탈퇴 기능 (현재 미구현입니다.)");
    })
})

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {

    let transEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';

    $("#transitionPage").on(transEnd, () => {
        this.history.back();
    });

    $("#transitionPage").css(
        {
            "display": "block",
            "left": "0%",
            "transition": "500ms"
        }
    );
});

