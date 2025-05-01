document.addEventListener('DOMContentLoaded', () => {
  const productTotalEl = document.querySelector('.totalProduct'); // 상품 합계
  const deliveryFeeEl = document.querySelector('.deliveryfee span'); // 배송비
  const totalEl = document.querySelector('.totalPay'); // 총합
  const productItems = document.querySelectorAll('.product_item'); // 상품들

  function allCalcTotal() {
    let productTotal = 0;

    productItems.forEach((item, index) => {
      const checkbox = item.querySelector('.checkProduct');

      if (checkbox.checked) { // 체크된 상품만 가격 더하기
        const priceElement = item.querySelector('.productPrice');
        const price = priceElement.dataset.price == 0 ? priceElement.dataset.price : 0;
        productTotal += price;

        // 상품별 가격 출력 대상 클래스 배열
        const priceDisplayClasses = ['firstPro', 'secondPro', 'thirdPro', 'forthPro', 'fifthPro'];
        const className = priceDisplayClasses[index];
        const priceDisplay = priceElement.querySelector(`.${className}`);

        if (priceDisplay) {
          priceDisplay.textContent = `가격: ₩${price.toLocaleString()}`;
        }
      }
    });

    // 총 상품 가격 표시
    productTotalEl.textContent = `₩${productTotal.toLocaleString()}`;

    // 배송비 추출 후 총합 계산
    const deliveryFee = parseFloat(deliveryFeeEl.textContent) || 0;
    const totalPay = productTotal + deliveryFee;

    // 총 결제 금액 표시
    totalEl.textContent = `₩${totalPay.toLocaleString()}`;
  }

  // 이벤트는 여기서 한 번만 걸기
  productItems.forEach((item) => {
    const checkbox = item.querySelector('.checkProduct');

    // 체크박스 상태 변경시
    checkbox.addEventListener('change', allCalcTotal);

    // div 클릭 시 체크박스 토글
    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('checkProduct')) return;

      checkbox.checked = !checkbox.checked;
      allCalcTotal(); // 상태 바뀌었으니 합산 다시
    });
  });

  allCalcTotal(); // 처음에 한번 계산
});