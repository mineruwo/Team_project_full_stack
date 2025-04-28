$(document).ready(() => {
    $("#in_signupBtn").on({
        click: () => {
            $(".loginWrap").css(
                "display", "none"
            );
            $(".signupWrap").css(
                "display", "flex"
            );
        }
    })

    $("#up_loginBtn").on({
        click: () => {
            $(".loginWrap").css(
                "display", "flex"
            );
            $(".signupWrap").css(
                "display", "none"
            );
        }
    })

    $(".btn_in").click(function () {

        let message;
        if ($(".in_input").val() == "") {
            alert('공백입니다.')
            return false;
        }
        else
        {
            message = loginUser($("#in_inputId").val(), $("#in_inputPw").val());

        }

        if(message.isSuccess)
        {
            console.log("성공");
            return true;
        }

        console.log(message.responseCode);

        switch(message.responseCode)
        {
            case 500: 
                break;
            case 501:
                break;
        }
        alert(message.resMessage);

        // else if(loginId){
        //     let loginId = loginUser($("#in_inputId").val());
        //     $(".in_errId").text(loginId.resMessage).css("color", "red");
        // }
        // else if(loginPw){
        //     let loginPw = loginUser($("#in_inputId").val());
        //     $(".in_errPw").text(loginPw.resMessage).css("color", "red");
        // }
        
    });
});

$("#checkBtn").click(function () {
    let message = idDupCheck($("#up_inputId").val());
    if (message.isSuccess) {
        $(".up_errId").text(message.resMessage).css("color", "blue");
        $("#up_inputPw").focus();
    }
    else 
    {
        $(".up_errId").text(message.resMessage).css("color", "red");
        $("#up_inputId").val("");
        $("#up_inputId").focus();
    }
})

    



$(function () {
    let checkId = RegExp(/^[a-zA-Z0-9]{6,20}$/);
    let checkPw = RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+])[A-Za-z\d~!@#$%^&*()_+]{8,16}$/);
    let checkName = RegExp(/^([가-힣]|[A-Z]|[a-z]){2,10}$/);
    let checkPhone = RegExp(/^[0-9+]{11,12}$/);
    // 전화번호 정규식: /^\d{3}-\d{3,4}-\d{4}$/
    // 핸드폰번호 정규식: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/

    let checkEmail = RegExp(/^([a-zA-Z0-9._%+-]{2,})$/);
    // +@[a-zA-Z0-9.-]+\.[a-zA-Z]

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
                $("#checkBtn").click(function () {
                    let message = idDupCheck($("#up_inputId").val());
                    if (message.isSuccess) {
                        $(".up_errId").text(message.resMessage).css("color", "blue");
                        $("#up_inputPw").focus();
                    }
                    else 
                    {
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

        // birth validation
        createYearMonth();

        function createYearMonth() {

            let cYear = moment().year()

            $("#birthYear").append($("<option>").text("선택").attr("value", "선택"));

            for (y = cYear; y >= cYear - 100; y--) {
                $("#birthYear").append($("<option>").val(y).text(y + "년"));
            }

            $("#birthMonth").append($("<option>").text("선택").attr("value", "선택"));

            for (let month = 1; month <= 12; month++) {
                let mValue = month < 10 ? "0" + month: month;
                $("#birthMonth").append($("<option>").val(mValue).text(mValue + "월"));
            }

            $("#birthDay").append($("<option>").text("선택").attr("value", "선택"));
            for (day = 1; day <= 31; day++) {
                let dayValue = day < 10 ? "0" + day: day;
                $("#birthDay").append($("<option>").val(dayValue).text(dayValue + "일"));
            }
        }

        function createDate() {

            let year = $("#birthYear").val();
            let month = $("#birthMonth").val();

            let adjustedMonth = parseInt(month, 10) - 1;

            let endDay = moment(year + "-" + (adjustedMonth + 1), "YYYY-MM").endOf("month").date();

            $("#birthDay option").remove();

            $("#birthDay").append($("<option>").text("선택").attr("value", "선택"));
            for (day = 1; day <= endDay; day++) {
                let dayValue = day < 10 ? "0" + day: day;
                $("#birthDay").append($("<option>").val(dayValue).text(dayValue + "일"));
            }
        }

        $("#birthYear, #birthMonth").change(createDate);

        // 버튼 클릭시
        $('.btn_up').click(function () {
            if ($(".up_input").val() == "") {
                alert('공백입니다.')
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
                let emailV = queryEmail.options[emailNode.selectedIndex].value;

                let yearNode = $("#birthYear")[0];
                let queryYear = document.querySelector("#birthYear");
                let yearV = queryYear.options[yearNode.selectedIndex].value;

                let MonthNode = $("#birthMonth")[0];
                let queryMonth = document.querySelector("#birthMonth");
                let monthV = queryMonth.options[MonthNode.selectedIndex].value;

                let dayNode = $("#birthDay")[0];
                let queryDay = document.querySelector("#birthDay");
                let dayV = queryDay.options[dayNode.selectedIndex].value;

                let id = $("#up_inputId").val();
                let pw = $("#up_inputPw").val();
                let name = $("#up_inputName").val();
                let email = $("#up_inputEmail").val()+emailV;
                let birthday = yearV+monthV+dayV;



                alert("회원가입을 완료하였습니다! :)");
                registerUser(id, pw, name, birthday, phonenum, email);
                location.reload();
//                 alert(`아이디 : ${id}
// 비밀번호 : ${pw}
// 이름 : ${name}
// 전화번호 : ${phonenum}
// 이메일 : ${email}
// 생년월일 : ${birthday}`);
                return true;
            }
        });
    }
    checkForm();
});

/* 로그인
1. loginUse(Id, pw); true 면 submit, fulse면 아이디가 틀렸습니다, 비밀번호가 틀렸습니다. 
2.아이디, 비밀번호 찾기
*/ 

/* sns 로그인, 회원가입
1. 링크 연결 or 팝업창
*/

// 가능하면 비밀번호 보이기, 숨기기 시도


