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
})
