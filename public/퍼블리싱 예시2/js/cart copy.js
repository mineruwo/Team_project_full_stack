const productSize_Key = "productSize";
const productImg_Key = "productImg";
const productName_Key = "productName";
const productCount_Key = "productCount";
const productType_Key = "productType";
const productPrice_Key = "productPrice";

let cartList = null;
let cartProductNum = 0;
let cartProductImg = null;
let cartProductName = null;
let cartProductCount = 0;
let cartProductType = null;
let cartProductPrice = 0;

let debugBtn = null;


function loadingCart() {
  let cartList = document.getElementById("cartList");
  let products = parseCookie(productName_Key);
  for(let cyc in products){
    let wrapDiv = document.createElement("div");
    wrapDiv.classList.add("cardWrap");
    wrapDiv.innerHTML = `
      <img src="${parseCookie(productImg_Key)[cyc].split("=")[1]}">
      <div class="cardInfo">
        <p class="cardName">${parseCookie(productName_Key)[cyc].split("=")[1]}</p>
        <p>
          <span class="cardType">${parseCookie(productType_Key)[cyc].split("=")[1]}</span>
          <span> / </span>
          <span class="cardSize">${parseCookie(productSize_Key)[cyc].split("=")[1]}</span>
        </p>
        <p class="cardCount">${parseCookie(productCount_Key)[cyc].split("=")[1]} 개</p>
        <p class="cardPrice">${parseCookie(productPrice_Key)[cyc].split("=")[1]} 원</p>
        <button type="button" class="deleteBtn">삭제</button>
      </div>
    `;
    cartList.appendChild(wrapDiv);
  }
}

function addCart() {
  let threeDayLater = new Date() + (24*60*60*1000) * 3;
  let cartNum = parseCookie(productName_Key).length;
  let itemCards = document.getElementsByClassName("itemCard");
  if(itemCards.length == 0) return;

  console.log("bake cookie");
  for(let cyc in itemCards){
    if(cyc == "length") return;
    
    document.cookie = bakeCookie(productCount_Key,   cartNum+Number(cyc), itemCards[cyc].getElementsByClassName("amounts")[0].value, threeDayLater);
    document.cookie = bakeCookie(productImg_Key,   cartNum+Number(cyc), document.getElementById("bigImg").src, threeDayLater);
    document.cookie = bakeCookie(productName_Key,  cartNum+Number(cyc), document.getElementById("productName").textContent, threeDayLater);
    document.cookie = bakeCookie(productSize_Key, cartNum+Number(cyc), itemCards[cyc].getElementsByClassName("sizeValue")[0].textContent, threeDayLater);
    document.cookie = bakeCookie(productType_Key,  cartNum+Number(cyc), itemCards[cyc].getElementsByClassName("colorValue")[0].textContent, threeDayLater);
    document.cookie = bakeCookie(productPrice_Key,  cartNum+Number(cyc), itemCards[cyc].getElementsByClassName("eachPrice")[0].textContent, threeDayLater);
  }
}