let putId = null;
let idVal = null;
let putPw1 = null;
let pwVal = null;
let putPw2 = null;
let pwVal_Check = null;
let putEmail = null;
let emailVal = null;
let putPhoneNum = null;
let phoneNumVal = null;
let loginSelect = null;
let signupSelect = null;
let allChkbox = null;
let commChk = null;
let infoThirdChk = null;
let userAgreeChk = null;
let termAccChk = null;
let signin_Btn = null
let pwdInput = null;
let pwdShow = null;

let id_Valid = false;
let pwd_Valid = false;
let pwdChk_Valid = false;
let email_Valid = false;
let phone_Valid = false;
let termVal = false;

onload = () => {
  init_Val();
  init_Func();
}

function init_Val() {
  putId = document.getElementById("ID_Input");// 아이디 입력창 가져옴!
  idVal = document.querySelectorAll(".idVal"); //ID 입력조건 표시줄

  putPw1 = document.querySelector(".PWD_Input"); // 비밀번호 입력창 가져옴!
  pwVal = document.querySelectorAll(".pwVal"); //PW입력조건 표시줄 

  putPw2 = document.querySelector(".PWD_Check"); // 비밀번호 재확인 입력창 가져옴!
  pwVal_Check = document.querySelectorAll(".pwVal_Check");// 비밀번호 재확인 표시줄

  putName = document.querySelector(".name_Input"); //이름 입력창 가져옴!
  nameVal = document.querySelectorAll(".nameVal_Check");

  putEmail = document.querySelector("#mail_Input");  //이메일 입력창 가져옴!
  emailVal = document.querySelectorAll(".emailVal");

  putPhoneNum = document.querySelector("#phoneNum_Input");
  phoneNumVal = document.querySelectorAll(".phoneNumVal");  //전화번호 관련 출력메세지

  loginSelect = document.getElementById("loginSelect_Btn");
  signupSelect = document.getElementById("signupSelect_Btn");

  allChkbox = document.getElementById("allChk");
  commChk = document.getElementById("commChk");
  infoThirdChk = document.getElementById("infoThirdChk");
  userAgreeChk = document.getElementById("userAgreeChk");
  termAccChk = document.getElementById("termAccChk");

  signin_Btn = document.getElementById("signinBtn"); // 회원가입 버튼

  pwdInput = document.querySelectorAll(".pwdInput"); // 비밀번호 입력 input
  pwdShow = document.querySelectorAll(".passwordEyeWrap"); // 비밀번호 보여주는 버튼
}

function init_Func() {
  input_Events();
  selectBtn_Event();
  chkbox_Event();
  signinBtn_Event();
  passwordEye_Event();
  imgSlider();
}

function input_Events() {

  putId.addEventListener('input', (event) => {//입력시 아이디 유효성 검사
    id_Valid = false;
    event.target.value = event.target.value.replace(/[^A-Za-z0-9]/ig, "");
    if (event.target.value.length !== 0) {
      if (!idEnNum(event.target.value) && idSign(event.target.value)) { //영어와 숫자
        console.log("chk")
        idVal.forEach((el) => {
          el.classList.add("hide");
        });
        idVal[2].classList.remove("hide"); //메세지 : 영어 또는 숫자만 가능합니다.
      } else if (!idLength(event.target.value)) { //길이
        idVal.forEach((el) => {
          el.classList.add("hide");
        });
        idVal[3].classList.remove("hide"); //메세지 : 아이디는 4~12자이어야 합니다.
      } else if (idEnNum(event.target.value) && idLength(event.target.value)) { //성공메세지
        idVal.forEach((el) => {
          el.classList.add("hide");
        });
        idVal[1].classList.remove("hide"); //메세지 : 사용할 수 있는 ID입니다.
        id_Valid = true;
      }
    } else if (event.target.value.length == 0) { // 빈 칸일 때
      idVal.forEach((el) => {
        el.classList.add("hide");
      });
      idVal[0].classList.remove("hide");
    }
  });
  /* 비밀번호 시작 */
  putPw1.addEventListener('input', () => {//입력시 비밀번호 유효성 검사
    pwd_Valid = false;
    putPw1.value = putPw1.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ]/g, "");
    function pwValHide() {
      pwVal.forEach((el) => {
        el.classList.add("hide");
      });
    }
    if (putPw1.value.length !== 0) {
      if (!pwEnNum(putPw1.value)) { //영어나숫자
        pwValHide();
        pwVal[2].classList.remove("hide"); //메세지 : 영어나 숫자가 있어야 합니다.
      } else if (!pwSign(putPw1.value)) { //특수기호
        pwValHide();
        pwVal[3].classList.remove("hide"); //메세지 : 특수기호가 있어야합니다.
      } else if (!pwLength(putPw1.value)) { //길이
        pwValHide();
        pwVal[4].classList.remove("hide"); //메세지 : 비밀번호는 8~12자이어야합니다.
      } else if (pwEnNum(putPw1.value) && pwSign(putPw1.value) && pwLength(putPw1.value)) { //성공메세지
        pwValHide();
        pwVal[1].classList.remove("hide"); //메세지 : 사용할 수 있는 passWord입니다.
        pwd_Valid = true;
      }
    } else { // 빈 칸일 때
      pwValHide();
    }
  });

  putPw2.addEventListener("input", () => {//비밀번호 재확인 유효성 검사
    pwdChk_Valid = false;
    function pwVal_CheckHide() {
      pwVal_Check.forEach((el) => {
        el.classList.add("hide");
      });
    }
    if (putPw1.value.length == 0) { //메세지 : 비밀번호를 먼저 입력해주세요.
      pwVal_CheckHide();
      pwVal_Check[3].classList.remove("hide");
      return;
    }
    if (putPw2.value.length !== 0) {
      if (!pwCheck(putPw2.value)) {
        pwVal_CheckHide();
        pwVal_Check[2].classList.remove("hide"); //메세지 : 비밀번호가 일치하지 않습니다.
      } else if (pwCheck(putPw2.value)) {
        pwVal_CheckHide();
        pwVal_Check[1].classList.remove("hide"); //메세지 : 비밀번호가 일치합니다.
        pwdChk_Valid = true;
      } else if (pwVal_Check.value.length == 0) { // 빈칸일때
        pwVal_CheckHide();
        pwVal_Check[0].classList.remove("hide");
      };
    } else {
      pwVal_CheckHide();
    }
  });
  /* 비밀번호 끝 */

  putName.addEventListener("input",()=>{ //이름 입력 정규식
    let regex = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
    putName.value = putName.value.replace(regex, '');
  });

  putPhoneNum.addEventListener("input", () => {//전화번호 이벤트
    phone_Valid = false;
    function phoneNumValHide() { // 경고 텍스트 전부 가리기
      phoneNumVal.forEach((el) => {
        el.classList.add("hide");
      });
    }
    if (putPhoneNum.value.length !== 0) {
      if (isNaN(Number(putPhoneNum.value))) {
        phoneNumValHide();
        phoneNumVal[2].classList.remove("hide"); //메세지 : 휴대폰 번호는 숫자만 입력해주세요.
      } else if (!phoneNumLength()) {
        phoneNumValHide();
        phoneNumVal[3].classList.remove("hide"); //메세지 : 휴대폰 번호 길이를 확인해주세요.
      } else if (!phoneNumVal_Valid(putPhoneNum.value)) {
        phoneNumValHide();
        phoneNumVal[4].classList.remove("hide"); //메세지 : 휴대폰 번호 양식을 확인해주세요.
      } else if (phoneNumLength() && phoneNumVal_Valid(putPhoneNum.value)) { //성공메세지
        phoneNumValHide();
        phoneNumVal[1].classList.remove("hide");
        phone_Valid = true;
      } else if (putPhoneNum.value.length == 0) {
        phoneNumValHide();
        phoneNumVal[0].classList.remove("hide");
      }
    } else {
      phoneNumValHide();
    }
  });

  putEmail.addEventListener("input", () => {//이메일 유효성 검사
    email_Valid = false;
    function emailValHide() {
      emailVal.forEach((el) => {
        el.classList.add("hide");
      });
    }
    if (putEmail.value.length !== 0) {
      if (emailVal_Valid()) {
        emailValHide();
        emailVal[1].classList.remove("hide"); //메세지 : 사용가능한 이메일 입니다.
        email_Valid = true;
      } else if (!emailVal_Valid()) {
        emailValHide();
        emailVal[2].classList.remove("hide"); //메세지 : 가능한 이메일 양식을 입력해주세요.
      } else if (putEmail.value.length == 0) { // 빈칸일때
        emailValHide();
        emailVal[0].classList.remove("hide");
      };
    } else {
      emailValHide();
    }
  });
}

/* 약관 체크 시작 */
function chkbox_Event() {
  allChkbox.addEventListener("change", (event) => {
    if (event.target.checked == true) {
      commChk.checked = true;
      infoThirdChk.checked = true;
      userAgreeChk.checked = true;
      termAccChk.checked = true;
    } else {
      commChk.checked = false;
      infoThirdChk.checked = false;
      userAgreeChk.checked = false;
      termAccChk.checked = false;
    }
  });

  commChk.addEventListener("change", chk_Valid);
  infoThirdChk.addEventListener("change", chk_Valid);
  userAgreeChk.addEventListener("change", chk_Valid);
  termAccChk.addEventListener("change", chk_Valid);

  function chk_Valid(event) {
    if (allChkbox.checked == true && event.target.checked == false) {
      allChkbox.checked = false;
    } else if (commChk.checked == true && infoThirdChk.checked == true && termAccChk.checked == true) {
      allChkbox.checked = true;
    }
  }
}
function signinBtn_Event() {
  signin_Btn.addEventListener("click", signin_Submit);
}
function signin_Submit() {
  let dateVal = new Date() + (24 * 60 * 60 * 1000) * 3;
  termVal = userAgreeChk.checked && termAccChk.checked;
  if (id_Valid == true && pwd_Valid == true && pwdChk_Valid == true && email_Valid == true && phone_Valid == true && termVal == true) {
    document.cookie = bakeCookie("id_", 0, putId.value, dateVal);
    document.cookie = bakeCookie("pwd_", 0, encodeURI(putPw1.value), dateVal);
    document.cookie = bakeCookie("email_", 0, putEmail.value, dateVal);
    location.replace("login.html");
  } else if (termVal == true) {
    window.alert("입력 정보 조건을 만족해주세요.");
  } else {
    window.alert("회원 약관에 동의해주세요.");
  }
}/* 약관 끝 */

//아이디
function idLength(value) {//아이디 길이
  return value.length >= 4 && value.length <= 12;
}
function idEnNum(str) {//아이디 영어 및 숫자
  return /[A-Za-z0-9]/.test(str);
}
function idSign(str) {//아이디 특수문자
  return /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g.test(str);
}

//비밀번호
function pwLength(value) {//비밀번호 길이
  return value.length >= 8 && value.length <= 12;
}
function pwEnNum(str) {//비밀번호 영어 및 숫자
  return /[A-Za-z0-9]/.test(str);
}
function pwSign(str) {//비밀번호 특수문자
  return /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g.test(str);
}

//비밀번호 재확인
function pwCheck() {//비밀번호와 재확인 값 비교
  return putPw1.value == putPw2.value;
}

//전화번호 
function phoneNumLength() {//전화번호 길이
  let num = putPhoneNum.value.split("-");
  let x = "";
  for (let cyc in num) {
    x += num[cyc];
  }
  return x.length >= 10 && x.length <= 11;
}
function phoneNumVal_Valid(Number) {//전화번호 정규식
  let phoneNumReslut = /^01([0|1|6|7|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return phoneNumReslut.test(Number);
}

//이메일
function emailVal_Valid() {//이메일 유효성 검사
  let emailStr = putEmail.value.substring(putEmail.value.indexOf("@") + 1, putEmail.value.length);
  return /[a-zA-Z]*([\.]?[a-zA-Z])\.[a-zA-Z]{2,3}$/.test(emailStr);
};

function selectBtn_Event() {
  loginSelect.addEventListener("click", () => {
    location.href = "login.html";
  });
}



// 비밀번호 보이기/숨기기
function passwordEye_Event() {
  pwdShow.forEach((el, i) => {
    el.addEventListener("click", () => {
      if (pwdInput[i].type == "password") {
        pwdInput[i].type = "text";
        el.children[0].classList.replace("fa-eye-slash", "fa-eye");
      } else {
        pwdInput[i].type = "password";
        el.children[0].classList.replace("fa-eye", "fa-eye-slash");
      }
    })
  });

  pwdInput.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentNode.classList.add("focus");
    });

    input.addEventListener("blur", () => {
      input.parentNode.classList.remove("focus");
    })
  });
}