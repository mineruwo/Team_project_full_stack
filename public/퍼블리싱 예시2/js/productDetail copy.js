//querySelector >> 초기값 null, 불린값 >> 초기값 false, 숫자 >> 초기값 0
let mainImg = null;
let bigImg = null;
let detailSection = null;
let wish = null;
let btnMore = null;
let lens = null;
let scopeImg = null;
let resultZone = null;
let cx = null;
let cy = null;
let pos = null;
let zoomImg = null;
let zoomResult = null;
let colorSelect = null;
let sizeSelect = null;
let selectedColor = null;
let selectedSize = null;
let totalSum = null;
let itemCards = null;
let amountInput = null;
let amount = null;
let priceInput = null;
let price = null;
let cardSum = null;
let cardPrice = null;
let totalAmount = null;
let container = null;
let productPrice = null;
let regex = null;


onload = () => {
  init_Val();
  init_Func();
}

function init_Val() {
  mainImg = $('.img_main img');
  bigImg = $('#bigImg');
  detailSection = $('#detailInfo');
  wish = $('.wish');
  btnMore = $('#btnMore');
  zoomImg = $('.zoomImg');
  zoomResult = $('.imgZoomin');
  colorSelect = document.getElementsByName('color')[0];
  sizeSelect = document.getElementsByName('size')[0];
  selectedColor = '';
  selectedSize = '';
  itemCards = document.getElementsByClassName('itemCard');
  totalAmount = document.getElementById('totalAmount');
  container = document.getElementById("totalPrice");
  productPrice = document.querySelector('#productPrice')
  regex = /[^0-9]/g;
}

function init_Func() {
  convertThumbnail();
  convertWishBtnColor();
  detailPageNavigation();
  detailPageCollapseExpand();
  imgLens();
  updateSum();
}

// 상품 이미지 썸네일 클릭시 메인 이미지 src 변경
function convertThumbnail() {
  mainImg.hover(function () { // 클래스 selected를 img 태그가 아닌 div.img_main에다 줄 것
    bigImg.attr("src", $(this).attr("src"));
    mainImg.removeClass('selected'); // 모든 이미지에서 'selected' 클래스 제거
    $(this).addClass('selected');
  });
  /* mainImg.forEach((el) => {
    el.addEventListener("mouseenter", function (e) {
      bigImg.setAttribute("src", this.getAttribute("src"));
      for(let i in mainImg) {
        mainImg.item(i).classList.remove("selected");
      }
      this.classList.add("selected");
    })
  }); */
}

// 찜 버튼 클릭 시 하트색 변경
function convertWishBtnColor() {
  wish.off('click');
  wish.on('click', function () {
    if (!$(this).hasClass("active")) {
      alert("찜하기에 추가되었습니다.");
      $(this).addClass("active");
    } else {
      alert("찜하기에서 제거되었습니다.");
      $(this).removeClass("active");
    }
  });
}

// 상품 상세 페이지 접기 / 펼치기 버튼
function detailPageCollapseExpand() {
  btnMore.off('click');
  btnMore.click(function () {
    if (detailSection.attr('class') == 'hidden') {
      detailSection.removeClass('hidden');
      $(this).text("상품정보 접기");
    } else {
      detailSection.addClass('hidden');
      $(this).text("상품정보 펼치기");
    }
  });
}

function detailPageNavigation() {
  $('.info_detail ul li a').on('click', function (e) { // 상세 페이지 접혀있는 경우에도 페이지 펼쳐서 이동
    e.preventDefault();

    let target = $($(this).attr('href')); //이동 타겟 위치

    //페이지 없는 경우 펼치기
    if (detailSection.hasClass('hidden')) {
      detailSection.removeClass('hidden');
      btnMore.text("상품정보 접기");
    }
    //이동
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 600); // 600ms 동안 이동
  });
}

// 상품 메인 이미지 위에 호버 시 등장하는 렌즈로 확대해서 보기
function imgLens() {
  function imageZoom(imgSelector, resultSelector) {
    // 필요한 요소들을 선택 또는 생성합니다.
    scopeImg = $(imgSelector);
    resultZone = $(resultSelector);
    if (!lens) {
      lens = $('<div/>', { class: 'zoom_lens' });
      lens.insertBefore(scopeImg);
    }

    // 렌즈와 결과 영역의 배경 이미지의 크기 배율을 계산합니다.
    cx = resultZone.width() / lens.width();
    cy = resultZone.height() / lens.height();

    // 결과 영역에 배경 이미지를 설정합니다.
    resultZone.css({
      backgroundImage: `url(${scopeImg.attr('src')})`,
      backgroundSize: `${scopeImg.width() * cx}px ${scopeImg.height() * cy}px`
    });

    // 마우스 이동 또는 터치 이벤트에 대한 핸들러를 설정합니다.
    lens.add(scopeImg).on('mousemove', function (e) {
      e.preventDefault();
      pos = getCursorPos(e, scopeImg);
      // 렌즈가 이미지 범위를 넘어가지 않도록 조절합니다.
      let x = pos.x - lens.width() / 2; // 렌즈 왼쪽 상단 꼭지점 좌표 x, y
      let y = pos.y - lens.height() / 2;
      x = Math.max(0, Math.min(x, scopeImg.width() - lens.width())); //좌상단을 최소범위 우하단을 최대범위로 지정함
      y = Math.max(0, Math.min(y, scopeImg.height() - lens.height()));

      // 렌즈와 결과 영역의 위치를 업데이트합니다.
      lens.css({ left: x, top: y });
      resultZone.css('backgroundPosition', `-${x * cx}px -${y * cy}px`); // 확대한 이미지를 이동시키는 css
    });
    // 커서 위치를 계산하는 함수를 정의합니다.
    function getCursorPos(e, scopeImg) {
      const imgOffset = scopeImg.offset();
      let x = e.pageX - imgOffset.left;
      let y = e.pageY - imgOffset.top;

      if (e.type === 'touchmove') {
        x = e.originalEvent.touches[0].pageX - imgOffset.left;
        y = e.originalEvent.touches[0].pageY - imgOffset.top;
      }

      return { x, y };
    }
  }

  function changeImg(smallImg) {

    // 큰 이미지 변경
    zoomImg.attr('src', smallImg.src);

    // 줌 기능 업데이트
    imageZoom('.zoomImg', '.imgZoomin');

    zoomResult.css('backgroundImage', `url(${smallImg.src})`);
  }
  // window의 load 이벤트에 이미지 줌 기능을 연결합니다.
  imageZoom('.zoomImg', '.imgZoomin');
  $(window).on('resize', function () {
    imageZoom('.zoomImg', '.imgZoomin');
  });

  mainImg.on('mouseenter', function () {
    changeImg(this);
  });

}

function updateSum() {
  totalSum = 0;
  for (const card of itemCards) {
    amountInput = card.querySelector('input[name="amounts"]');
    amount = parseInt(amountInput.value, 10) || 0;  // 기본값 추가
    priceInput = card.querySelector('input[name="price"]');
    price = parseInt(priceInput.value, 10) || 0;  // 기본값 추가
    cardSum = amount * price;
    totalSum += cardSum;

    // 카드마다 총액 업데이트
    cardPrice = card.querySelector('.cardPrice');
    cardPrice.textContent = `금액: ${cardSum.toLocaleString('kr-KR')}원`;

  }

  // 총량 감지
  totalAmount.textContent = totalSum.toLocaleString('kr-KR');
}

// 상품 구매 옵션 및 수량 확인 후 금액 계산

function showItemCard() {
  if (selectedColor !== "" && selectedSize !== "") {
    // 중복 itemCard 감지
    const existingCards = document.querySelectorAll('.itemCard');
    for (const card of existingCards) {
      const colorValue = card.querySelector('.colorValue span').textContent;
      const sizeValue = card.querySelector('.sizeValue span').textContent;

      if (colorValue === selectedColor && sizeValue === selectedSize) {
        alert("이미 선택한 색상과 사이즈입니다.");
        // select 초기화
        colorSelect.value = "";
        sizeSelect.value = "";
        selectedColor = '';
        selectedSize = '';
        return;
      }
    }

    // 새 itemCard 생성
    const itemCardDiv = document.createElement("div");
    itemCardDiv.className = 'itemCard';
    
    // Ensure `productPrice` is properly defined
    const eachPrice = productPrice ? productPrice.innerText.replace(regex, "") : "0";
    
    itemCardDiv.innerHTML = `
      <p class="colorValue">선택 옵션 : <span>${selectedColor}</span></p>
      <p class="sizeValue">선택 사이즈 : <span>${selectedSize}</span></p>
      <div class="priceBtn">
        <input type="hidden" name="price" value="${eachPrice}">
        <input type="button" name="substract" value="-" />
        <input type="text" name="amounts" value="1" size="1" />
        <input type="button" name="add" value="+" />
        <div class="cardPrice">금액: ${eachPrice}원</div>
      </div>
      <button name="deleteDiv">삭제</button>
    `;

    container.insertAdjacentElement('beforebegin', itemCardDiv);

    // select 초기화
    colorSelect.value = "";
    sizeSelect.value = "";
    selectedColor = '';
    selectedSize = '';

    // innerHTML로 생성된 요소들에 이벤트 리스너 추가
    const subBtn = itemCardDiv.querySelector('input[name="substract"]');
    const addBtn = itemCardDiv.querySelector('input[name="add"]');
    const amountInput = itemCardDiv.querySelector('input[name="amounts"]');
    const deleteBtn = itemCardDiv.querySelector('button[name="deleteDiv"]');

    subBtn.addEventListener('click', function () {
      sub(this);
      updateSum();
    });

    addBtn.addEventListener('click', function () {
      add(this);
      updateSum();
    });

    amountInput.addEventListener('input', function () {
      updateSum();
    });

    deleteBtn.addEventListener('click', function () {
      deleteDiv(this);
      updateSum();
    });

    updateSum();
  }
}

// 호출 시점 조정
document.addEventListener('DOMContentLoaded', function () {
  init_Val();  // 초기화 함수 호출
  init_Func(); // 필요 시 추가적인 함수 호출

  colorSelect.addEventListener('change', function () {
    selectedColor = colorSelect.value;
    showItemCard();
  });

  sizeSelect.addEventListener('change', function () {
    selectedSize = sizeSelect.value;
    showItemCard();
  });
});

function add(button) { // 플러스 버튼
  const itemCardDiv = button.closest('.itemCard');
  const amountInput = itemCardDiv.querySelector('input[name="amounts"]');
  let amount = parseInt(amountInput.value, 10) || 0;  // 기본값 추가
  amount++;
  amountInput.value = amount;
  updateSum();
}

function sub(button) { // 마이너스 버튼
  const itemCardDiv = button.closest('.itemCard');
  const amountInput = itemCardDiv.querySelector('input[name="amounts"]');
  let amount = parseInt(amountInput.value, 10) || 0;  // 기본값 추가
  amount = Math.max(amount - 1, 1);
  amountInput.value = amount;
  updateSum();
}

function deleteDiv(button) { // div 삭제
  const itemCardDiv = button.closest('.itemCard');
  if (itemCardDiv) {
    itemCardDiv.remove();
    updateSum();
  }
}

  

$(document).ready(function () {


  // 이미지 슬라이드  
  makeSlider($('.itemSliderWrap'), $('.itemSlider'), $('.sliderImgWrap'), $('.prev'), $('.next'));


  function makeSlider(element, flex, sibling, prev, next) {
    const offsetX = sibling.innerWidth() + parseInt(flex.css('gap'));

    function btnVisibility() {
      if (element.scrollLeft() <= 0) {
        prev.addClass('inactive');
      } else {
        prev.removeClass('inactive');
      }

      if (
        element.scrollLeft() + element[0].clientWidth >=
        element[0].scrollWidth
      ) {
        next.addClass('inactive');
      } else {
        next.removeClass('inactive');
      }
    }

    next.click(function () {
      const newOffsetX = element.scrollLeft() + offsetX * 3; // 이동거리 변경할시 offsetX변경
      element.animate({ scrollLeft: newOffsetX }, 500, btnVisibility);
    });

    prev.click(function () {
      const newOffsetX = element.scrollLeft() - offsetX * 3;
      element.animate({ scrollLeft: newOffsetX }, 500, btnVisibility);
    });
    element.on("scroll", btnVisibility);
    btnVisibility();
  }

  uploadRecent(mainImg_Src, mainText); // 다시 확인
  downloadRecent();
});
