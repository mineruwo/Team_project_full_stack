const ID_Placeholder = "아이디";
const PWD_Placeholder = "비밀번호";
const capsWarning_Text = "CapsLock이 켜져 있음"

let loginSelect = null;
let signupSelect = null;

let loginInput_Form = null;
let loginInput_ID = null;
let loginInput_PWD = null;
let capsWarn = null;
let loginWarn = null;
let isWarned = false;

let forgetId_Btn = null;
let forgetPwd_Btn = null;

let passwordEye = null;

let login_Btn = null;



onload = () => {

  console.log("onload..");
  if (parseCookie("userOnline_0")[0]) {
    location.replace("userInfo.html");
  }
  init_Var();
  init_Event();
  init_Func();
};

function init_Var() {
  loginInput_Form = document.getElementsByClassName("loginInfo_Form")[0];
  loginInput_ID = document.getElementById("login_ID");
  loginInput_PWD = document.getElementById("login_PWD");
  passwordEye = document.getElementById("passwordEye");
  loginSelect = document.getElementById("loginSelect_Btn");
  signupSelect = document.getElementById("signupSelect_Btn");
  forgetId_Btn = document.getElementsByClassName("forgetID_Btn")[0];
  forgetPwd_Btn = document.getElementsByClassName("forgetPWD_Btn")[0];
  login_Btn = document.getElementsByClassName("login_Btn")[0];
}

function init_Event() {
  loginInput_Event();
  passwordEye_Event();
  selectBtn_Event();
  forgetBtn_Event();
  login_Btn_Event();
}

function init_Func() {
  imgSlider();
}


// 아이디 비밀번호 input focus 시 placeholder 숨기기
function loginInput_Event() {
  loginInput_ID.addEventListener("focus", () => {
    console.log("focus on loginInput");
    loginInput_ID.placeholder = "";
  });
  loginInput_ID.addEventListener("blur", () => {
    console.log("blur on loginInput");
    loginInput_ID.placeholder = ID_Placeholder;
  }, false);

  loginInput_PWD.addEventListener("focus", (e) => {
    console.log("focus on loginInput");
    loginInput_PWD.placeholder = "";
  });
  loginInput_PWD.addEventListener("blur", () => {
    console.log("blur on loginInput");
    loginInput_PWD.placeholder = PWD_Placeholder;
  }, false);

  loginInput_PWD.addEventListener("keydown", (e) => {
    console.log("keyDown");
    if (e.getModifierState("CapsLock") && !isWarned) {
      capsWarn = loginInput_Form.appendChild(document.createElement("p"));
      capsWarn.style.color = "red";
      capsWarn.style.textAlign = "center";
      capsWarn.textContent = capsWarning_Text;
      isWarned = true;
    } else if (!e.getModifierState("CapsLock") && isWarned) {
      loginInput_Form.removeChild(capsWarn);
      isWarned = false;
    }
  });
}


// 비밀번호 보이기/숨기기
function passwordEye_Event() {
  passwordEye.addEventListener("click", () => {
    if (loginInput_PWD.type == "password") {
      loginInput_PWD.type = "text";
      passwordEye.classList.replace("fa-eye-slash", "fa-eye");
    } else {
      loginInput_PWD.type = "password";
      passwordEye.classList.replace("fa-eye", "fa-eye-slash");
    }
  })
}

function selectBtn_Event() {
  signupSelect.addEventListener("click", () => {
    location.href = "signup.html";
  })
}
function forgetBtn_Event() {
  forgetId_Btn.addEventListener("click", () => {
    let forgetID_Win = open("forgetID.html", "아이디찾기", "scrollbars=0,resizable=0,width=300,height=400");
  });
  forgetPwd_Btn.addEventListener("click", () => {
    let forgetPWD_Win = open("forgetPWD.html", "비밀번호찾기", "scrollbars=0,resizable=0,width=300,height=400");
  });
}
function login_Btn_Event() {
  login_Btn.addEventListener("click", () => {
    let isIDCurrect = null;
    let isPWDCurrect = null;
    if (parseCookie("id_0").length != 0 && parseCookie("pwd_0").length != 0) {
      isIDCurrect = parseCookie("id_0")[0].split("=")[1] == loginInput_ID.value;
      isPWDCurrect = decodeURI(parseCookie("pwd_0")[0].split("=")[1]) == loginInput_PWD.value;
    }
    if (isIDCurrect && isPWDCurrect) {
      document.cookie = bakeCookie("userOnline_", 0, loginInput_ID.value, new Date());
      location.replace("userInfo.html");
    } else {
      if (!loginWarn)
        loginWarn = loginInput_Form.appendChild(document.createElement("p"));
      loginWarn.textContent = "아이디/비밀번호 오류";
    }
  });
}