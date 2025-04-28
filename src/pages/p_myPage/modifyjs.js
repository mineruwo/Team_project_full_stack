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

    $("#nameValue").text(nameEncrypt("손민우"));
    $("#birValue").text(birthEncrypt("19940913"));
    $("#phoneValue").text(phoneNumEncrypt("01049503013"));
    $("#phoneValue").text(phoneNumEncrypt("01049503013"));
    $("#mailValue").text(emailAddrEncrypt("mineruwo@gmail.com"));
    $("#addrValue").text(addrEncrypt("서울특별시 강동구 암사2동 삼성광나루 아파트 102동 1103호"));

    $("#photoChnage").click(() => {
        alert("photoChange");
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
        $("#nickname").text(`${modalBodyInput[0].value} 님`);
        $("#nickNameChange").modal('hide');
    });

    $("#PInfomodify").click(() => {
        let option = 'width = 440px, height=600px, left =50px, top = 100px, menubar = no';
        let userModify = window.open('modifyInfo.html', userInfoTable.textContent, option);

        console.log(userModify);
    });
})

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function() {

    let transEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';

    $("#transitionPage").on(transEnd, () => {
        this.history.back();
    });

    $("#transitionPage").css(
        {
            "display": "block",
            "left": "0%",
            "transition" : "500ms"
        }
    );
});

