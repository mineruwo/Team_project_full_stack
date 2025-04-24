/*
1. 로그인
- 아이디 : 공백, 포커스
- 비밀번호 : 공백, 포커스
-> 아래 입력하세요 err 표시

2. 회원가입
- 이메일 : @, .com 포함
RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/);
- 아이디 : 영소/대문자, 숫자
RegExp(/^[A-Za-z0-9_\-]{5,20}$/);
- 비밀번호 : 8~16글자, 특수문자 하나 이상 포함
RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/);

-> 아래 입력하세요 err 표시
*/


// const checkSpcStr = idValue => {
//     const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

//     const result = regExp.test(idValue);

//     return result;
// }

// $(document).ready(()=>{
//     $('.btn_login').click(()=>{
//         if($('#login_inputId').val() == ""){
//             alert("아이디를 입력해주세요.")
//             $(this).focus();
//             return;
//         }
//         else if($('#login_inputId'))
//     });
// })

$(function () {
    let checkID = RegExp(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g);

    function checkForm() {
        $(".btn_login").click(function () {
            if ($("#login_inputId").val() == "") {
                alert("아이디를 입력해주세요");
                $("#login_inputId").focus();
                return false;
            } else if (checkID.test($("#login_inputId").val())) {
                alert("특수문자 사용 금지");
                $("#login_inputId").focus();
                return false;
            } else if (checkID.test($("#login_inputId").val())) {
                alert("사용가능한 아이디입니다.")
                $("#login_inputPw").focus();
                return true;
            }
        });
    }
});
checkForm()