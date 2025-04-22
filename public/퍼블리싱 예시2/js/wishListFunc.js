function addWishList(obj){
  let targetObj = obj.parentNode.parentNode.parentNode;
  let targetObj_Src = targetObj.querySelector("img").src;
  let targetObj_Name = targetObj.querySelector(".productText").children[0].textContent;
  let targetObj_Price = targetObj.querySelector(".productText").children[1].textContent;

  const wishSrc = "wishSrc_";
  const wishName = "wishName_";
  const wishPrice = "wishPrice_";
  
  let initNum = 0;
  let dateVal = new Date() + (24*60*60*1000)*3;
  let cookies = parseCookie(wishName);
  if(parseCookie(wishName).length){
    initNum = parseCookie(wishName).length;
  }
  
  console.log(initNum);

  for(let cyc in cookies){
    if(cookies[cyc].split("=")[1] == targetObj_Name){
      initNum = cyc;
    }
  }

  document.cookie = bakeCookie(wishName, initNum, targetObj_Name, dateVal);
  document.cookie = bakeCookie(wishSrc, initNum, targetObj_Src, dateVal);
  document.cookie = bakeCookie(wishPrice, initNum, targetObj_Price, dateVal);
}
function removeWishList(obj){
  let targetObj = obj.parentNode.parentNode.parentNode;
  let targetObj_Name = targetObj.querySelector(".productText").children[0].textContent;

  const wishSrc = "wishSrc_";
  const wishName = "wishName_";
  const wishPrice = "wishPrice_";

  let cookies = parseCookie(wishName);
  let targetIndex = 0;
  let dateVal = new Date() - 1;
  for(let cyc in cookies){
    if(cookies[cyc].split("=")[1] == targetObj_Name){
      targetIndex = cyc;
    }
  }
  document.cookie = bakeCookie(wishName, targetIndex, "", dateVal);
  document.cookie = bakeCookie(wishSrc, targetIndex, "", dateVal);
  document.cookie = bakeCookie(wishPrice, targetIndex, "", dateVal);
}