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

    $("#mypage").click(()=>
        {
            if(!isLogin())
            {
                window.location.href = "../p_loginPage/logIn_signUp.html";
                return;
            }

            window.location.href = "../p_myPage/myPage.html";
        });   
})
