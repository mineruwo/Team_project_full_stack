$(document).ready(() => {
    $(".linkDiv").on({
        mouseenter: function () {
            $(this).css(
                {
                    "cursor": "pointer",
                    "background-color": "gray"
                });
        },
        mouseleave: function () {
            $(this).css(
                {
                    "cursor": "none",
                    "background-color": "lightgray"
                });
        }
    });

    let transEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';
    $("#transitionPage").on(transEnd, () => {
        window.location = "modify.html";
    });

    $("#orderList").click(() => {
        window.location = "modify.html";
    });

    $("#modify").click(() => {
        $("#transitionPage").css(
            {
                "left": "0%",
            }
        )
    });


    $("#refundList").click(() => {
        window.location = "#";
        alert("refund List Click to move");
    });

    $("#customCenter").click(() => {
        window.location = "#";
        alert("customCenter List Click to move");
    });

    $("#notice").click(() => {
        window.location = "#";
        alert("notice List Click to move");
    });

})