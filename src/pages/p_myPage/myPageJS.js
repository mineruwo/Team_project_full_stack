let nextLocate = "";

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

    const navi = performance.getEntriesByType('navigation')[0];


    if (navi?.type === 'back_forward') {
        showTransitionDiv();
        setTimeout(hideTransitionLeft, 100);

        addTransitionEvent();
    }
    else {
        addTransitionEvent();
    }

    $("#orderList").click(() => {

        nextLocate = "orderList.html";
        $("#transitionPage").css(
            {
                "transition": "500ms",
                "left": "0%",
            }
        )
    });

    $("#modify").click(() => {
        nextLocate = "modify.html";
        $("#transitionPage").css(
            {
                "transition": "500ms",
                "left": "0%",
            }
        )
    });


    $("#refundList").click(() => {
        nextLocate = "refundList.html";
        $("#transitionPage").css(
            {
                "transition": "500ms",
                "left": "0%",
            }
        )
    });

    $("#customCenter").click(() => {
        window.location = "#";
        alert("customCenter List Click to move");
    });

    $("#notice").click(() => {
        nextLocate = "notice.html";
        $("#transitionPage").css(
            {
                "transition": "500ms",
                "left": "0%",
            }
        )
    });

})

function showTransitionDiv() {
    $("#transitionPage").css(
        {
            "left": "0%",
        }
    );
}
function hideTransitionLeft() {
    $("#transitionPage").css(
        {
            "transition": "500ms",
            "left": "-100%",
        }
    );
}

function addTransitionEvent()
{
    let transEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';

    $("#transitionPage").on(transEnd, () => {
        if (nextLocate == "") {
            return;
        }

        window.location = nextLocate;
    });
}
