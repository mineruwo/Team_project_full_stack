const phoneRex = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g;
const emailRex = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/g;


$(document).ready(() => {
    const forms = document.querySelectorAll('.needs-validation')

    const phoneDivNode = $("#phone");
    const emailDivNode = $("#email");

    const phoneNumInputNode = $("#phoneNumber");
    const emailNumInputNode = $("#emailAddress");



    let isPhone = true;

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            event.stopPropagation();

            if ((isPhone && phoneNumInputNode.val() == "") || (!isPhone && emailNumInputNode.val() == "")) {
                alert("입력된 값이 존재하지 않습니다. 입력값을 확인 부탁드리겠습니다.");
                form.checkValidity();
                return;
            }

            if (isPhone) {

                let isValid = phoneRex.test(phoneNumInputNode.val());

                console.log(phoneRex);
                console.log(phoneNumInputNode.val());
                console.log(isValid);

                if (!isValid) {
                    alert("휴대전화 형식이 올바르지 않습니다. 다시 한번 확인 부탁드리겠습니다.");
                    return;
                }

                modifyUserInfo(phoneNumInputNode.val(), "");
            }
            else {
                let isValid = emailRex.test(emailNumInputNode.val());

                console.log(emailRex);
                console.log(emailNumInputNode.val());
                console.log(isValid);

                if (!isValid) {
                    alert("이메일 형식이 올바르지 않습니다. 다시 한번 확인 부탁드리겠습니다.");
                    return;
                }

                modifyUserInfo("", emailNumInputNode.val());
            }

            alert(`${isPhone ? "휴대폰 번호" : "이메일 주소"}가 수정되었습니다.`);
            window.close();
            opener.location.reload();
        });
    });

    phoneDivNode.css("display", "flex");
    emailDivNode.css("display", "none");

    let toggles = document.querySelectorAll("input[type='radio']");

    phoneNumInputNode.attr("required");
    console.log(toggles);

    $("#modifyPhone").click((event) => {
        event.preventDefault();
        phoneDivNode.css("display", "flex");
        emailDivNode.css("display", "none");

        phoneNumInputNode.attr("required");
        emailNumInputNode.removeAttr("required");

        isPhone = true;

    });

    $("#modifyEmail").click((event) => {
        event.preventDefault();
        phoneDivNode.css("display", "none");
        emailDivNode.css("display", "flex");

        emailNumInputNode.attr("required");
        phoneNumInputNode.removeAttr("required");

        isPhone = false;
    })
});