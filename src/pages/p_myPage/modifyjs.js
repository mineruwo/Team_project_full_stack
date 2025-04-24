$(document).ready(() => {

    let transEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';
    $("#transitionPage").on(transEnd, () => {
        $("#transitionPage").css(
            {
                "display": "none"
            }
        )
    });

    $("#transitionPage").css(
        {
            "left": "100%"
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
            // Button that triggered the modal
            console.log("modal");
            // Update the modal's content.

        });
    }


    $("#nickform").submit((evnet) => {
        evnet.preventDefault();
    })


    $("#nickSave").on('click', function () {
        const modalBodyInput = $("#changeNick");
        console.log(modalBodyInput[0]);
        console.log(modalBodyInput[0].value);
        $("#nickname").text(`${modalBodyInput[0].value} 님`);
        $("#nickNameChange").modal('hide');
    })
});

