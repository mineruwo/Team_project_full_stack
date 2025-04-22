let inputArr = [];
let code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowLeft", "a", "b", "a", "b"];
onload = () => {
  window.addEventListener("keydown", inputKey => {
    let isCurrect = true;
    if (inputKey.repeat) return;

    if (inputArr.length < 12 && inputKey.key != "Escape") {
      inputArr.push(inputKey.key);
    } else if (inputKey.key != "Escape") {
      inputArr.shift();
      inputArr.push(inputKey.key);
    }
    if (inputKey.key == "Escape") {
      console.log(inputArr);
    }

    if (inputArr.length == code.length) {
      for (let cyc in code) {
        if (inputArr[cyc] != code[cyc]) isCurrect = false;
      }
      if (isCurrect) {
        document.getElementsByClassName("typography")[0].textContent = "Hello world!!!";
      }
    }

  });
}

// 이미지에 맞춰 스크롤 이동..!
let interval = true;
let timeouts = null;
let imgListHeight = $(".imgWrap").height();
$(".img").each(function (index) {
  $(this).attr("data-index", imgListHeight * (index / $(".img").length));
});
$(".footer").attr("data-index", $(".footer").offset().top);
$(".img").on("mousewheel", function (e) {
  e.preventDefault();
  
  let imgPage = parseInt($(this).attr("data-index"));
  let scrollPerPx = imgListHeight * (1 / $(".img").length);

  if (e.originalEvent.wheelDelta >= 0) {
    if(interval){
      $("html,body").stop().animate({ scrollTop: imgPage - scrollPerPx });
      interval = false;
      timeouts = setTimeout(()=>{interval = true},500);
    }else if(timeouts){
      clearTimeout(timeouts);
      timeouts = setTimeout(()=>{interval = true},500);
    }
  } else if (e.originalEvent.wheelDelta < 0) {
    if(interval){
      $("html,body").stop().animate({ scrollTop: imgPage + scrollPerPx });
      interval = false;
      timeouts = setTimeout(()=>{interval = true},500);
    }else if(timeouts){
      clearTimeout(timeouts);
      timeouts = setTimeout(()=>{interval = true},500);
    }
  }
});

// $(document).on("mousewheel", function (e) {
//   e.preventDefault();

//   let currentScroll = $(document).scrollTop();
//   let scrollPerPx = $(window).height();

//   let closestImg = $(".img").toArray().reduce(function (closest, img) {
//     let imgPage = parseInt($(img).attr("data-index"));
//     return Math.abs(imgPage - currentScroll) < Math.abs(parseInt($(closest).attr("data-index")) - currentScroll) ? img : closest;
//   });

//   let imgPage = parseInt($(closestImg).attr("data-index"));

//   if (e.originalEvent.wheelDelta >= 0) {
//     // 스크롤 업 (이전 이미지로 이동)
//     if (interval && imgPage > 0) {
//       $("html,body").stop().animate({ scrollTop: imgPage - scrollPerPx }, 500);
//       interval = false;
//       timeouts = setTimeout(() => { interval = true }, 500);
//     } else if (timeouts) {
//       clearTimeout(timeouts);
//       timeouts = setTimeout(() => { interval = true }, 500);
//     }
//   } else {
//     // 스크롤 다운 (다음 이미지로 이동)
//     if (interval && imgPage < (imgCount - 1) * scrollPerPx) {
//       $("html,body").stop().animate({ scrollTop: imgPage + scrollPerPx }, 500);
//       interval = false;
//       timeouts = setTimeout(() => { interval = true }, 500);
//     } else if (timeouts) {
//       clearTimeout(timeouts);
//       timeouts = setTimeout(() => { interval = true }, 500);
//     }
//   }
// });
