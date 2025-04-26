/* 이미지 슬라이더 */
function imgSlider() {
  const imgBoxes = document.querySelectorAll('#visualSlider .imgBox');
  let currentIndex = 0;

  imgBoxes[currentIndex].classList.add('visible');
  // imgBox 순환 함수
  function showNextImage() {
    // 다음 인덱스로 이동 (마지막 이미지일 경우 첫 번째로 돌아감)
    const nextIndex = (currentIndex + 1) % imgBoxes.length;

    // 다음 이미지에 visible 클래스 추가
    imgBoxes[nextIndex].classList.add('visible');

    // 현재 이미지에 hiding 클래스 추가
    imgBoxes[currentIndex].classList.add('hiding');

    // 0.5초 후에 현재 이미지에서 visible, hiding 클래스를 제거
    setTimeout(() => {
      imgBoxes[currentIndex].classList.remove('visible');
      imgBoxes[currentIndex].classList.remove('hiding');
      // 현재 인덱스를 다음 인덱스로 업데이트
      currentIndex = nextIndex;
    }, 500); // 500ms (0.5초)
  }

  // 11초마다 showNextImage 함수 실행
  setInterval(showNextImage, 10500);
}
