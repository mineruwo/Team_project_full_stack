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

-> 아래 '입력하세요' err 표시
*/
$(function () {
    let checkID = RegExp(/^[a-z0-9]{6,20}$/);
    let checkPW = RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+])[A-Za-z\d~!@#$%^&*()_+]{8,16}$/);
    let checkName = RegExp(/^[가-힣]|[A-Z]|[a-z]$/);
    let checkPhone = RegExp(/^[0-9+]{11,12}$/);        
    let checkEmail = RegExp(/^([a-zA-Z0-9._%+-]{2,})$/);
    // +@[a-zA-Z0-9.-]+\.[a-zA-Z]

    function checkForm() {            
        // id      
        $("#up_inputId").blur(function (){                
            if($(this).val() == "" ){
                // alert("아이디를 입력해주세요");
                $(".errId").text("아이디를 입력해주세요").css("color", "red");
                // $("#up_inputId").focus();
                return false;
            }else if(!checkID.test($("#up_inputId").val())) {
                $(".errId").text("형식에 맞게 입력해주세요.").css("color", "red");
                // $("#up_inputId").focus();              
                return false;
            }else if(checkID.test($("#up_inputId").val())) {
                $(".errId").text("사용가능한 아이디입니다.").css("color", "blue");                
                $("#up_inputPw").focus();
                return true;
            }
        });

        // pw
        $("#up_inputPw").blur(function(){
            if($(this).val() == "" ){                
                $(".errPw").text("비밀번호를 입력해주세요").css("color", "red");
                // $("#up_inputPw").focus();
                return false;
            }else if(!checkPW.test($("#up_inputPw").val())) {
                $(".errPw").text("문자, 숫자, 특수문자를 조합하여 8 ~ 16 자리로 입력해 주세요.").css("color", "red");
                // $("#up_inputPw").focus();           
                return false;
            }else if(checkPW.test($("#up_inputPw").val())) {
                $(".errPw").text("사용가능한 비밀번호 입니다.").css("color", "blue");
                $("#up_inputPwChk").focus();
                return true;                          
            }
        });

        // checkPw
        $("#up_inputPwChk").blur(function(){
            if($("#up_inputPw").val() == "" || $("#up_inputPw").val() != $("#up_inputPwChk").val()){
                $(".errIdChk").text("비밀번호와 일치하게 입력해주세요.").css("color", "red");
                // $("#up_inputPwChk").focus();    
                return false;
            }else if ($("#up_inputPw").val() == $("#up_inputPwChk").val()){
                $(".errIdChk").text("비밀번호가 일치합니다.").css("color", "blue");
                $("#up_inputName").focus();
                return true;  
            }
        });

        // name
        $("#up_inputName").blur(function(){
            if($(this).val() == "" ){  
                $(".errName").text("이름을 입력해주세요.").css("color", "red");             
                // $("#up_inputName").focus();
                return false;
            }else if(!checkName.test($("#up_inputName").val())) {
                $(".errName").text("한글 또는 영문으로 입력해주세요.").css("color", "red");
                // $("#up_inputName").focus();              
                return false;
            }else if(checkName.test($("#up_inputName").val())) {
                $(".errName").text("사용가능한 이름입니다.").css("color", "blue");
                $("#up_inputTell").focus();                          
                return true;
            }
        });

        // tell js substring 적용 01012345678 -> 010-1234-5678 변경
        $("#up_inputTell").blur(function(){
            if($(this).val() == "" ){ 
                $(".errTell").text("휴대폰번호를 입력해주세요.").css("color", "red");              
                // $("#up_inputTell").focus();
                return false;
            }else if(!checkPhone.test($("#up_inputTell").val())) {
                $(".errTell").text("숫자만 입력해주세요.").css("color", "red");
                // $("#up_inputTell").focus();           
                return false;
            }else if(checkPhone.test($("#up_inputTell").val())) {
                $(".errTell").text("입력완료").css("color", "blue");
                $("#up_inputEmail").focus();
                return true;                          
            }
        });

        // email
        $("#up_inputEmail").blur(function(){
            if($(this).val() == "" ){                
                $(".errEmail").text("이메일을 입력해주세요.").css("color", "red");
                // $("#up_inputEmail").focus();
                return false;
            }else if(!checkEmail.test($("#up_inputEmail").val())) {
                $(".errEmail").text("이메일 형식에 맞춰 입력해주세요. ex) ***@naver.com").css("color", "red");
                // $("#up_inputEmail").focus();        
                return false;
            }else if(checkEmail.test($("#up_inputEmail").val())) {
                $(".errEmail").text("입력완료").css("color", "blue");
                $("#errInfo").focus();
                return true;                          
            }
        });
    }
    checkForm();    
       
    // button 클릭시        
    $('.btn_up').click(function(){
        if($("#up_inputId").val() == "" || $("#up_inputPw").val() == "" || $("#up_inputName").val() == "" || $("#up_inputTell").val() == "" || $("#up_inputEmail").val() == "" ){                
            alert("공백을 입력하세요.");               
            return false;
        }else if ($("#up_inputPw").val() != $("#userPW_confirm").val()){
            alert("비밀번호가 서로 일치하지 않습니다.");
            return false;
        }else if(!checkID.test($("#up_inputId").val()) || !checkPW.test($("#up_inputpW").val()) || !checkName.test($("#up_inputName").val()) || !checkPhone.test($("#up_inputTell").val()) || !checkEmail.test($("#up_inputEmail").val())) {
            alert("형식에 맞춰 작성해주세요.")                               
            return false;
        }else {
            alert("달리의 가족이 되신걸 환영합니다! :)");
            console.log("userID: " + `${$("#up_inputId").val()}`);
            console.log(`userPW: ${$("#up_inputPw").val()}`);
            console.log(`userName: ${$("#up_inputName").val()}`);
            console.log(`userPhone: ${$("#up_inputTell").val()}`);
            console.log(`userEmail: ${$("#up_inputEmail").val()}`);
            return true;
        }                      
    });        
});
