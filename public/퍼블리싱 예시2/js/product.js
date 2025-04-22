window.onload = () => {
  addCart();
  addWish();
  imgSlider();
  downloadRecent();
}


// 장바구니 및 찜버튼 클릭시 알럿 표시
function addCart() {
  $(".cartWrap").click(function () {
    if (!$(this).hasClass("active")) {
      alert("장바구니에 추가되었습니다.");
      $(this).addClass("active");
      loadCart(this);
      document.getElementsByClassName("cartNum")[0].textContent = parseCookie("productImg").length;
    } else {
      alert("장바구니에서 제거되었습니다.");
      $(this).removeClass("active");
      unloadCart(this);
      document.getElementsByClassName("cartNum")[0].textContent = parseCookie("productImg").length;
    }
  });
}

function addWish() {
  $(".wishWrap").click(function () {
    if (!$(this).hasClass("active")) {
      alert("찜하기에 추가되었습니다.");
      $(this).addClass("active");
      addWishList(this);
    } else {
      alert("찜하기에서 제거되었습니다.");
      $(this).removeClass("active");
      removeWishList(this);
    }
  });
}

//장바구니 쿠키 
function loadCart(obj) {
  //let target_ImgSrc = obj;
  let target_ImgSrc = obj.parentNode.parentNode.querySelector("img").src;
  let dateVal = new Date() + (24 * 60 * 60 * 1000);
  let cartCookie_Key_Img = "productImg"
  let cartCookie_Key_Link = "cartLink_"
  let imgCookie = parseCookie(cartCookie_Key_Img);

  if (imgCookie.length < 10) {
    document.cookie = cartCookie_Key_Img + imgCookie.length + "=" + target_ImgSrc + ";path=/;expires=" + dateVal + ";";
  } else {
    console.log("else");
    for (let cyc = 0; cyc < imgCookie.length - 1; cyc++) {
      let cutCookie = imgCookie[cyc + 1].substring(imgCookie[cyc + 1].indexOf("=") + 1, imgCookie[cyc + 1].length);
      document.cookie = cartCookie_Key_Img + cyc + "=" + cutCookie + ";path=/;expires=" + dateVal + ";";
    }
    document.cookie = cartCookie_Key_Img + (imgCookie.length - 1) + "=" + target_ImgSrc + ";path=/;expires=" + dateVal + ";";
  }
}
function unloadCart(obj) {
  let imgCookie = parseCookie("productImg");
  let target_ImgSrc = obj.parentNode.parentNode.querySelector("img").src;
  console.log(target_ImgSrc);
  for (let cyc = imgCookie.length - 1; cyc >= 0; cyc--) {
    let cutTarget = target_ImgSrc.substring(target_ImgSrc.indexOf("=") + 1, target_ImgSrc.length);
    let cutCookie = imgCookie[cyc].substring(imgCookie[cyc].indexOf("=") + 1, imgCookie[cyc].length);
    if (cutTarget == cutCookie) {
      document.cookie = "productImg" + cyc + "=;expires=" + (new Date() - 1) + ";";
      return;
    }
  }
}
function parseCookie(str) {
  let cookieStr = document.cookie;
  let cookieArr = cookieStr.split("; ");
  let arr = [];
  for (let cyc in cookieArr) {
    console.log(cookieArr[cyc].indexOf(str));
    if (cookieArr[cyc].indexOf(str) != -1) {
      console.log(cookieArr[cyc]);
      arr.push(cookieArr[cyc]);
    }
  }
  return arr;
}