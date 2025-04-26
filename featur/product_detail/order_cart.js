document.addEventListener('DOMContentLoaded', () => {
    const productTotalEl = document.querySelector('.totalProduct'); // 상품 합계
    const deliveryFeeEl = document.querySelector('.deliveryfee span'); // 배송비
    const totalEl = document.querySelector('.totalPay'); // 총합
    const productItems = document.querySelectorAll('.product_item'); // 상품들
  
    function allCalcTotal() {
      let productTotal = 0;
  
      productItems.forEach((item, index) => {
        const priceElement = item.querySelector('.productPrice');
        const price = parseFloat(priceElement.dataset.price) || 0;
        productTotal += price;
  
        // 상품별 가격 출력 대상 클래스 배열
        const priceDisplayClasses = ['firstPro', 'secondPro', 'thirdPro', 'forthPro', 'fifthPro'];
        const className = priceDisplayClasses[index];
        const priceDisplay = priceElement.querySelector(`.${className}`);
  
        if (priceDisplay) {
          priceDisplay.textContent = `가격: ₩${price.toLocaleString()}`;
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
  
    allCalcTotal(); // 페이지 로드시 자동 계산
  });