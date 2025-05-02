document.addEventListener('DOMContentLoaded', () => {
  const productTotalEl = document.querySelector('.totalProduct'); // 상품 합계
  const deliveryFeeEl = document.querySelector('.deliveryfee span'); // 배송비
  const totalEl = document.querySelector('.totalPay'); // 총합
  const productItems = document.querySelectorAll('.product_item'); // 상품들

  function allCalcTotal() {
    let productTotal = 0;

    productItems.forEach((item, index) => {//상품을들 각각 돌며 
      const checkbox = item.querySelector('.checkProduct');//체크박스 에 .checkProduct클래스를 가진 item들을 대입한다 

      if (checkbox.checked) { // 체크된 상품만 가격 더하기 //만약 대입된 checkbox가 체크되엇다면 
        const priceElement = item.querySelector('.productPrice');//priceElement에 iteme들의 가격을 대입하고
        const price = priceElement.dataset.price != 0 ? priceElement.dataset.price : 0;//가격에 priceElement의 가격 정보가 0이면 
        productTotal += parseInt(price);//productTotal에 price 값을 계속 대입한다 

        // 상품별 가격 출력 대상 클래스 배열
        const priceDisplayClasses = ['firstPro', 'secondPro', 'thirdPro', 'forthPro', 'fifthPro'];//priceDisplayClasses는 상품들의 배열이다 
        const className = priceDisplayClasses[index];//className은 배열의 순서 
        const priceDisplay = priceElement.querySelector(`.${className}`);//priceDisplay 는 상품들의 클래스이다 

        if (priceDisplay) {//만약 priceDisplay 라면
          priceDisplay.textContent = `가격: ₩${parseInt(price).toLocaleString()}`;//priceDisplay의 텍스트 콘텐트를 가격 : 을 출력한다 .
        }
      }
    });

    // 총 상품 가격 표시
    productTotalEl.textContent = `₩${parseInt(productTotal).toLocaleString()}`;//상품의 총각경의 출력값은 상품전체의 숫자 값을 스트링으로 나열한다.

    // 배송비 추출 후 총합 계산
    const deliveryFee = deliveryFeeEl.textContent;//딜리버리피의 문자값을 deliveryFee 대입한다 
    const totalPay = productTotal + parseInt(deliveryFee);// 총금액은 상품값 총합에 배송료를 더한 값이다

    // 총 결제 금액 표시
    totalEl.textContent = `₩${totalPay.toLocaleString()}`;//총 결제금액은 totalpay의 값을 텍스트로 출력한다 
  }

  // 이벤트는 여기서 한 번만 걸기
  productItems.forEach((item) => {//상품들을 각각 돌며 
    const checkbox = item.querySelector('.checkProduct');//checkbox의 값을 다시 확인하여

    // 체크박스 상태 변경시
    checkbox.addEventListener('change', allCalcTotal);//checkbox의 상태값이 변경되었을시 다시 계산한다 

    // div 클릭 시 체크박스 토글
    item.addEventListener('click', (e) => {// item을 클릭햇을시 
      if (e.target.classList.contains('checkProduct')) return;//아이템이 체크되어잇다면 리턴 

      checkbox.checked = !checkbox.checked;//아이템 체크박스가 체크되어잇지않다면 
      allCalcTotal(); // 상태 바뀌었으니 합산 다시
    });
  });

  allCalcTotal(); // 처음에 한번 계산

  $("#payButton").click(() => {

    let getProductList = Object.values(productItems);

    let checkedProduct = getProductList.filter(element => element.querySelector('.checkProduct').checked == true);

    console.log(checkedProduct);
    if (checkedProduct.length == 0) {
        alert("선택한 상품이 존재하지 않습니다.");
      return;
    }

    window.location.href = "../p_orderPage/orderProduct.html"
  })
});