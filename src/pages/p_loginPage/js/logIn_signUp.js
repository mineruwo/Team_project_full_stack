$(document).ready(()=>{
    $("#in_signupBtn").on({
        click : ()=>{
            $(".loginWrap").css(
                "display","none"
            );
            $(".signupWrap").css(
                "display","flex"
            );
        }
    })

    $("#up_loginBtn").on({
        click : ()=>{
            $(".loginWrap").css(
                "display","flex"
            );
            $(".signupWrap").css(
                "display","none"
            );
        }
    })
});

$(function () {
    let checkId = RegExp(/^[a-z0-9]{6,20}$/);
    let checkPw = RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+])[A-Za-z\d~!@#$%^&*()_+]{8,16}$/);
    let checkName = RegExp(/^([가-힣]|[A-Z]|[a-z]){2,10}$/);
    let checkPhone = RegExp(/^[0-9+]{11,12}$/);
    // 전화번호 정규식: /^\d{3}-\d{3,4}-\d{4}$/
    // 핸드폰번호 정규식: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/

    let checkEmail = RegExp(/^([a-zA-Z0-9._%+-]{2,})$/);
    // +@[a-zA-Z0-9.-]+\.[a-zA-Z]

    function checkForm() {            
        // id validation
        $("#up_inputId").blur(function ()
        {                
            if($(this).val() == "" )
            {
                // alert("아이디를 입력해주세요");
                $(".errId").text("아이디를 입력해주세요").css("color", "red");
                return false;
            }
            else if(!checkId.test($("#up_inputId").val()))
            {
                $(".errId").text("형식에 맞게 입력해주세요.").css("color", "red");
                return false;
            }
            else if(checkId.test($("#up_inputId").val()))
            {
                $(".errId").text("사용가능한 아이디입니다.").css("color", "blue");                
                $("#up_inputPw").focus();
                return true;
            }
        });

        // pw validation
        $("#up_inputPw").blur(function()
        {
            if($(this).val() == "" )
            {                
                $(".errPw").text("비밀번호를 입력해주세요").css("color", "red");
                return false;
            }
            else if(!checkPw.test($("#up_inputPw").val()))
            {
                $(".errPw").text("문자, 숫자, 특수문자를 조합하여 8 ~ 16 자리로 입력해 주세요.").css("color", "red");
                return false;
            }
            else if(checkPw.test($("#up_inputPw").val()))
            {
                $(".errPw").text("사용가능한 비밀번호 입니다.").css("color", "blue");
                $("#up_inputPwChk").focus();
                return true;                          
            }
        });

        // checkPw validation
        $("#up_inputPwChk").blur(function()
        {
            if($("#up_inputPwChk").val() == "" || $("#up_inputPw").val() != $("#up_inputPwChk").val())
            {
                $(".errPwChk").text("비밀번호와 일치하게 입력해주세요.").css("color", "red");
                return false;
            }
            else if ($("#up_inputPw").val() == $("#up_inputPwChk").val())
            {
                $(".errPwChk").text("비밀번호가 일치합니다.").css("color", "blue");
                $("#up_inputName").focus();
                return true;  
            }
        });

        // name validation
        $("#up_inputName").blur(function()
        {
            if($(this).val() == "" )
            {  
                $(".errName").text("이름을 입력해주세요.").css("color", "red");             
                return false;
            }
            else if(!checkName.test($("#up_inputName").val()))
            {
                $(".errName").text("한글 또는 영문으로 입력해주세요. (2 글자 이상)").css("color", "red");
                return false;
            }
            else if(checkName.test($("#up_inputName").val()))
            {
                $(".errName").text("사용가능한 이름입니다.").css("color", "blue");
                $("#up_inputTell").focus();                          
                return true;
            }
        });

        // tell validation
        $("#up_inputTell").blur(function()
        {
            if($(this).val() == "" )
            { 
                $(".errTell").text("휴대폰번호를 입력해주세요.").css("color", "red");              
                return false;
            }
            else if(!checkPhone.test($("#up_inputTell").val()))
            {
                $(".errTell").text("숫자만 입력해주세요. (11 ~ 12자리)").css("color", "red");
                return false;
            }
            else if(checkPhone.test($("#up_inputTell").val()))
            {
                
                let num = this.value
                if(num.length === 11)
                {
                    let eleven = num.substring(0,3) + "-" + num.substring(3,7) + "-" + num.substring(7,11);
                    $("#up_inputTell").val(eleven);
                }
                if(num.length === 12)
                {
                    let twelve = num.substring(0,4) + "-" + num.substring(4,8) + "-" + num.substring(8,12);
                    $("#up_inputTell").val(twelve);
                }
                $(".errTell").text("입력완료").css("color", "blue");
                $("#up_inputEmail").focus();
                return true;                          
            }
        });

        // email validation
        const birthYearEl = document.querySelector('#birthYear')
        isYearOptionExisted = false;
        birthYearEl.addEventListener('focus', function () 
        {
        if(!isYearOptionExisted) 
        {
            isYearOptionExisted = true
            for(var i = 1940; i <= 2025; i++) 
            {
            const YearOption = document.createElement('option')
            YearOption.setAttribute('value', i)
            YearOption.innerText = i
            this.appendChild(YearOption);
            }
        }
    });

        const birthMonthEl = document.querySelector('#birthMonth')
        isMonthOptionExisted = false;
        birthMonthEl.addEventListener('focus', function () 
        {
        if(!isMonthOptionExisted) 
        {
            isMonthOptionExisted = true
            for(var i = 1; i <= 12; i++) 
            {
            const MonthOption = document.createElement('option')
            MonthOption.setAttribute('value', i)
            MonthOption.innerText = i
            this.appendChild(MonthOption);
            }
        }
    });

        const birthDayEl = document.querySelector('#birthDay')
        isDayOptionExisted = false;
        birthDayEl.addEventListener('focus', function () 
        {
        if(!isDayOptionExisted) 
        {
            isDayOptionExisted = true
            for(var i = 1; i <= 31; i++) 
            {
            const DayOption = document.createElement('option')
            DayOption.setAttribute('value', i)
            DayOption.innerText = i
            this.appendChild(DayOption);
            }
        }
    });



        $("#up_inputEmail").blur(function()
        {
            if($(this).val() == "" )
            {                
                $(".errEmail").text("이메일을 입력해주세요.").css("color", "red");
                return false;
            }
            else if(!checkEmail.test($("#up_inputEmail").val()))
            {
                $(".errEmail").text("이메일 형식에 맞춰 입력해주세요. ex) ***@naver.com").css("color", "red");
                return false;
            }
            else if(checkEmail.test($("#up_inputEmail").val()))
            {
                $(".errEmail").text("입력완료").css("color", "blue");
                $("#errInfo").focus();
                return true;                          
            }
        });

        // 버튼 클릭시
        $('.btn_up').click(function()
        {
            if($(".up_input").val() == "")
            {
                alert('공백입니다.')
                return false;
            }
            else if($("#up_inputPwChk").val() == "" || $("#up_inputPw").val() != $("#up_inputPwChk").val())
            {
                alert("비밀번호가 서로 일치하지 않습니다.");
                $("#up_inputPwChk").focus();
                return false;
            }
            else if(!checkId.test($("#up_inputId").val()) || !checkPw.test($("#up_inputPw").val()) || !checkName.test($("#up_inputName").val()) || !checkPhone.test($("#up_inputTell").val().replaceAll('-',"")) || !checkEmail.test($("#up_inputEmail").val()))
            {
                alert("형식에 맞춰 작성해주세요.");                              
                return false;
            }
            else
            {
                let emailnode = $("#emailSel")[0];
                let queryEmail = document.querySelector("#emailSel");
                let emailV = queryEmail.options[emailnode.selectedIndex].value;

                alert("회원가입을 완료하였습니다! :)");
                alert(`아이디 : ${$("#up_inputId").val()}
비밀번호 : ${$("#up_inputPw").val()}
이름 : ${$("#up_inputName").val()}
전화번호 : ${$("#up_inputTell").val()}
이메일 : ${$("#up_inputEmail").val()}${emailV}
생년월일 : ${YearV} ${MonthV} ${DayV}`);
                return true;
            }                      
        });
    }
    checkForm();    
});

// 비밀번호 보이기, 숨기기
// 생년월일 https://narunarus.tistory.com/23
// loginUse(Id, pw); true 면 submit, fulse면 아이디가 틀렸습니다, 비밀번호가 틀렸습니다.
// 블러시 경고나 입력값 없애기
// 아이디, 비밀번호 찾기
// sns 로그인, 회원가입
// 아이디 중복 확인
