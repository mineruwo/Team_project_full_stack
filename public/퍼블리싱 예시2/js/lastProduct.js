function uploadRecent (imgSrc, productText) { // 최근 본 상품 쿠키에 저장
  const target_ImgSrc = imgSrc;
  const target_txt = productText;
  const dateVal = new Date() + (24 * 60 * 60 * 1000);
  const recentCookie_Key_Img = "recentImgSrc_";
  const recentCookie_Key_Link = "recentLink_";
  const recentCookie_Key_Txt = "recentTxt_";

  console.log(target_ImgSrc);

  let imgCookie = parseCookie(recentCookie_Key_Img);
  let linkCookie = parseCookie(recentCookie_Key_Link);
  let txtCookie = parseCookie(recentCookie_Key_Txt);

  if (imgCookie.length == 0) {
    document.cookie = bakeCookie(recentCookie_Key_Img, 0, target_ImgSrc, dateVal);
    document.cookie = bakeCookie(recentCookie_Key_Txt, 0, target_txt, dateVal);
    return;
  } else {
    for (let cyc in imgCookie) {
      console.log(imgCookie[cyc].split("=")[1]);
      if (imgCookie[cyc].split("=")[1] == target_ImgSrc) { //쿠키에서 "=" 이후 이미지 소스 추출후 존재 하는지 확인하고 존재 추가 하지 않고 종료
        return; 
      }
    }
    if (imgCookie.length < 5) {
      document.cookie = bakeCookie(recentCookie_Key_Img, imgCookie.length, target_ImgSrc, dateVal);
      document.cookie = bakeCookie(recentCookie_Key_Txt, txtCookie.length, target_txt, dateVal);
    } else {
      for (let cyc = 0; cyc < imgCookie.length - 1; cyc++) {
        let cutCookie = imgCookie[cyc + 1].substring(imgCookie[cyc + 1].indexOf("=") + 1, imgCookie[cyc + 1].length);
        document.cookie = bakeCookie(recentCookie_Key_Img, cyc, cutCookie, dateVal);
        document.cookie = bakeCookie(recentCookie_Key_Txt, cyc, target_txt, dateVal);
      }
      document.cookie = bakeCookie(recentCookie_Key_Img, imgCookie.length - 1, target_ImgSrc, dateVal);
      document.cookie = bakeCookie(recentCookie_Key_Txt, txtCookie.length - 1, target_txt, dateVal);
    }
  }
}

function downloadRecent() { // 쿠키를 화면에 노출
  const recentScroll = document.getElementsByClassName("viewScroll")[0];
  const recentCookie_Key_Img = "recentImgSrc_";
  const recentCookie_Key_Link = "recentLink_";
  const recentCookie_Key_Txt = "recentTxt_";

  let imgCookie = parseCookie(recentCookie_Key_Img);
  let txtCookie = parseCookie(recentCookie_Key_Txt);

  for (let cyc in imgCookie) {
    
    let outerDiv = document.createElement("div");
    let innerDiv = document.createElement("div");
    let imgTag = document.createElement("img");
    let paraTag = document.createElement("p");
    imgTag.src = imgCookie[cyc].split("=")[1];
    paraTag.textContent = txtCookie[cyc].split("=")[1];
    outerDiv.className = "viewItem";
    innerDiv.className = "viewImg";
    innerDiv.appendChild(imgTag);
    outerDiv.appendChild(innerDiv);
    outerDiv.appendChild(paraTag);
    console.log(outerDiv);
    recentScroll.appendChild(outerDiv);
  }
}