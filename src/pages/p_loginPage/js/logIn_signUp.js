$(document).ready(() => {
    // 로그인, 회원가입 체인지 버튼
    $("#in_signupBtn").on({
        click: () => {
            $(".loginWrap").css(
                "display", "none"
            );
            $(".signupWrap").css(
                "display", "flex"
            );
        }
    });

    $("#up_loginBtn").on({
        click: () => {
            $(".loginWrap").css(
                "display", "flex"
            );
            $(".signupWrap").css(
                "display", "none"
            );
        }
    });

    // 로그인 submit 버튼
    $(".btn_in").click(function () {
        let message;
        if ($(".in_input").val() == "") {
            alert('정보를 입력하세요.')
            return false;
        }
        else {
            message = loginUser($("#in_inputId").val(), $("#in_inputPw").val());
        }

        switch (message.responseCode) {
            case 500:
                $(".in_errId").text(message.resMessage).css("color", "red");
                break;

            case 501:
                $(".in_errId").empty();
                $(".in_errPw").text(message.resMessage).css("color", "red");
                break;

            case 200:
                $("#in_inputId").val("");
                alert(message.resMessage);
                location.href = "../p_mainPage/index.html";
        };
    });

    // 아이디 비밀번호 찾기 버튼
    $("#find").click(function () {
        let option = 'width = 460px, height = 630px, menubar=1';
        window.open('find.html', ($("#in_inputPw").textcontent), option);
    });

    // 아이디 비밀번호 찾기 체인지 버튼
    $(document).ready(() => {
        // 아이디 비밀번호 찾기 체인지 버튼
        $("#id_findPwBtn").on({
            click: () => {
                $(".findIdWrap").css(
                    "display", "none"
                );
                $(".findPwWrap").css(
                    "display", "flex"
                );
            }
        });

        $("#pw_findIdBtn").on({
            click: () => {
                $(".findIdWrap").css(
                    "display", "flex"
                );
                $(".findPwWrap").css(
                    "display", "none"
                );
            }
        })
    });

    // birth select option 생성 함수 (년, 월)
    function createYearMonth() {

        let createYear = moment().year();

        $("#birthYear").append($("<option>").text("선택").attr("value", "선택"));

        for (let year = createYear; year >= createYear - 100; year--) {
            $("#birthYear").append($("<option>").val(year).text(year + "년"));
        }

        $("#birthMonth").append($("<option>").text("선택").attr("value", "선택"));

        for (let month = 1; month <= 12; month++) {
            let monthValue = month < 10 ? "0" + month : month;
            $("#birthMonth").append($("<option>").val(monthValue).text(monthValue + "월"));
        }

        $("#birthDay").append($("<option>").text("선택").attr("value", "선택"));
        for (let day = 1; day <= 31; day++) {
            let dayValue = day < 10 ? "0" + day : day;
            $("#birthDay").append($("<option>").val(dayValue).text(dayValue + "일"));
        }
    }

    // birth select option 생성 함수 (일)
    function createDate() {

        let year = $("#birthYear").val();
        let month = $("#birthMonth").val();

        let adjustedMonth = parseInt(month, 10) - 1;

        let endDay = moment(year + "-" + (adjustedMonth + 1), "YYYY-MM").endOf("month").date();

        $("#birthDay option").remove();

        $("#birthDay").append($("<option>").text("선택").attr("value", "선택"));
        for (let day = 1; day <= endDay; day++) {
            let dayValue = day < 10 ? "0" + day : day;
            $("#birthDay").append($("<option>").val(dayValue).text(dayValue + "일"));
        }
    };
    createYearMonth();
    $("#birthYear, #birthMonth").change(createDate);

    // 회원가입 유효성 검사
    $(function () {
        let checkId = RegExp(/^[a-zA-Z0-9]{6,20}$/); // 영대소문자, 숫자 6 ~ 20자
        let checkPw = RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+])[A-Za-z\d~!@#$%^&*()_+]{8,16}$/); // 영대소문자, 특수문자 포함 8 ~ 16자
        let checkName = RegExp(/^([가-힣]|[A-Z]|[a-z]){2,10}$/); // 한글, 영대소문자 2 ~ 10 자
        let checkPhone = RegExp(/^[0-9+]{11,12}$/); // 숫자 11 ~ 12자
        let checkEmail = RegExp(/^([a-zA-Z0-9._%+-]{2,})$/); // 영대소문자, 숫자 2글자 이상

        function checkForm() {
            // id validation
            $("#up_inputId").blur(function () {
                if ($(this).val() == "") {
                    $(".up_errId").text("아이디를 입력해주세요").css("color", "red");
                    return false;
                }
                else if (!checkId.test($("#up_inputId").val())) {
                    $(".up_errId").text("형식에 맞게 입력해주세요.").css("color", "red");
                    return false;
                }
                else if (checkId.test($("#up_inputId").val())) {
                    $(".up_errId").text("중복확인 해주세요.").css("color", "red");
                    // 아이디 중복 체크 버튼
                    $("#checkBtn").click(function () {
                        let message = idDupCheck($("#up_inputId").val());
                        if (message.isSuccess) {
                            $(".up_errId").text(message.resMessage).css("color", "blue");
                            $("#up_inputPw").focus();
                        }
                        else {
                            $(".up_errId").text(message.resMessage).css("color", "red");
                            $("#up_inputId").val("");
                            $("#up_inputId").focus();
                        }
                    })
                    return true;
                }
            });

            // pw validation
            $("#up_inputPw").blur(function () {
                if ($(this).val() == "") {
                    $(".up_errPw").text("비밀번호를 입력해주세요").css("color", "red");
                    return false;
                }
                else if (!checkPw.test($("#up_inputPw").val())) {
                    $(".up_errPw").text("문자, 숫자, 특수문자를 조합하여 8 ~ 16 자리로 입력해 주세요.").css("color", "red");
                    return false;
                }
                else if (checkPw.test($("#up_inputPw").val())) {
                    $(".up_errPw").text("사용가능한 비밀번호 입니다.").css("color", "blue");
                    $("#up_inputPwChk").focus();
                    return true;
                }
            });

            // checkPw validation
            $("#up_inputPwChk").blur(function () {
                if ($("#up_inputPwChk").val() == "" || $("#up_inputPw").val() != $("#up_inputPwChk").val()) {
                    $(".errPwChk").text("비밀번호와 일치하게 입력해주세요.").css("color", "red");
                    return false;
                }
                else if ($("#up_inputPw").val() == $("#up_inputPwChk").val()) {
                    $(".errPwChk").text("비밀번호가 일치합니다.").css("color", "blue");
                    $("#up_inputName").focus();
                    return true;
                }
            });

            // name validation
            $("#up_inputName").blur(function () {
                if ($(this).val() == "") {
                    $(".errName").text("이름을 입력해주세요.").css("color", "red");
                    return false;
                }
                else if (!checkName.test($("#up_inputName").val())) {
                    $(".errName").text("한글 또는 영문으로 입력해주세요. (2 글자 이상)").css("color", "red");
                    return false;
                }
                else if (checkName.test($("#up_inputName").val())) {
                    $(".errName").text("사용가능한 이름입니다.").css("color", "blue");
                    $("#up_inputTell").focus();
                    return true;
                }
            });

            // tell validation
            $("#up_inputTell").blur(function () {
                if ($(this).val() == "") {
                    $(".errTell").text("휴대폰번호를 입력해주세요.").css("color", "red");
                    return false;
                }
                else if (!checkPhone.test($("#up_inputTell").val())) {
                    $(".errTell").text("숫자만 입력해주세요. (11 ~ 12자리)").css("color", "red");
                    return false;
                }
                else if (checkPhone.test($("#up_inputTell").val())) {

                    let num = this.value
                    if (num.length === 11) {
                        let eleven = num.substring(0, 3) + "-" + num.substring(3, 7) + "-" + num.substring(7, 11);
                        $("#up_inputTell").val(eleven);
                    }
                    if (num.length === 12) {
                        let twelve = num.substring(0, 4) + "-" + num.substring(4, 8) + "-" + num.substring(8, 12);
                        $("#up_inputTell").val(twelve);
                    }
                    $(".errTell").text("입력완료").css("color", "blue");
                    $("#up_inputEmail").focus();
                    return true;
                }
            });

            // email validation
            $("#up_inputEmail").blur(function () {
                if ($(this).val() == "") {
                    $(".errEmail").text("이메일을 입력해주세요.").css("color", "red");
                    return false;
                }
                else if (!checkEmail.test($("#up_inputEmail").val())) {
                    $(".errEmail").text("이메일 형식에 맞춰 입력해주세요. ex) ***@naver.com").css("color", "red");
                    return false;
                }
                else if (checkEmail.test($("#up_inputEmail").val())) {
                    $(".errEmail").text("입력완료").css("color", "blue");
                    $("#errInfo").focus();
                    return true;
                }
            });



            // 회원가입 submit 버튼
            $('.btn_up').click(function () {
                if ($(".up_input").val() == "") {
                    alert('정보를 입력하세요.')
                    return false;
                }
                else if ($("#up_inputPwChk").val() == "" || $("#up_inputPw").val() != $("#up_inputPwChk").val()) {
                    alert("비밀번호가 서로 일치하지 않습니다.");
                    $("#up_inputPwChk").focus();
                    return false;
                }
                else if (!checkId.test($("#up_inputId").val()) || !checkPw.test($("#up_inputPw").val()) || !checkName.test($("#up_inputName").val()) || !checkPhone.test($("#up_inputTell").val().replaceAll('-', "")) || !checkEmail.test($("#up_inputEmail").val())) {
                    alert("형식에 맞춰 작성해주세요.");
                    return false;
                }
                else {

                    let tellNum = $("#up_inputTell").val();
                    let phonenum = tellNum.replaceAll("-", "");

                    let emailNode = $("#emailSel")[0];
                    let queryEmail = document.querySelector("#emailSel");
                    let emailValue = queryEmail.options[emailNode.selectedIndex].value;

                    let yearNode = $("#birthYear")[0];
                    let queryYear = document.querySelector("#birthYear");
                    let yearValue = queryYear.options[yearNode.selectedIndex].value;

                    let monthNode = $("#birthMonth")[0];
                    let queryMonth = document.querySelector("#birthMonth");
                    let monthValue = queryMonth.options[monthNode.selectedIndex].value;

                    let dayNode = $("#birthDay")[0];
                    let queryDay = document.querySelector("#birthDay");
                    let dayValue = queryDay.options[dayNode.selectedIndex].value;

                    let id = $("#up_inputId").val();
                    let pw = $("#up_inputPw").val();
                    let name = $("#up_inputName").val();
                    let email = $("#up_inputEmail").val() + emailValue;
                    let birthday = yearValue + monthValue + dayValue;

                    let register = registerUser(id, pw, name, birthday, phonenum, email);
                    alert(register.resMessage);
                    location.reload();
                    return true;
                }
            });
        }
        checkForm();
    });
});



