onload = ()=>{
  loadWish();
}

function loadWish() {
  let wrap = document.getElementById("wishList");

  const wishSrc = "wishSrc_";
  const wishName = "wishName_";
  const wishPrice = "wishPrice_";
 
  let wishs = parseCookie(wishName);

  for(let cyc in wishs){
    let wrapDiv = document.createElement("div");
    wrapDiv.classList.add("cardWrap");
    wrapDiv.innerHTML = `
      <img src="${parseCookie(wishSrc)[cyc].split("=")[1]}">
      <div class="cardInfo">
        <p class="cardName">${parseCookie(wishName)[cyc].split("=")[1]}</p>
        <p class="cardPrice">${parseCookie(wishPrice)[cyc].split("=")[1]} 원</p>
        <button type="button" class="deleteBtn">삭제</button>
      </div>
    `;
    wrap.appendChild(wrapDiv);
  }
}
