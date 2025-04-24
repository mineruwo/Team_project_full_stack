/* 이미지 슬라이더 */
function imgSlider() {
    const imgBoxes = document.querySelectorAll('.visualSlider .imgBox');

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

    // 6 초마다 showNextImage 함수 실행
    setInterval(showNextImage, 5500);
}


// 슬라이더 함수 
// (넘기고 싶은 아이템/좌 버튼/우 버튼) 
/*
function createSlider({ itemSelector, prevButtonSelector, nextButtonSelector }) {
    const items = document.querySelectorAll(itemSelector);
    const prevButton = document.querySelector(prevButtonSelector);
    const nextButton = document.querySelector(nextButtonSelector);

    let currentIndex = 0;

    if (items.length === 0) return;

    // 첫 번째 항목 보이게
    items[currentIndex].classList.add('visible');

    function showItem(index) {
        items.forEach(item => {
            item.classList.remove('visible');
            item.classList.remove('hiding');
        });

        items[index].classList.add('visible');
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }

    function prevItem() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    }

    nextButton?.addEventListener("click", nextItem);
    prevButton?.addEventListener("click", prevItem);
}
*/

// 이미지 스크롤
function scrollImg({ itemSelector, prevButtonSelector, nextButtonSelector }) {
    const scroll = document.querySelector(itemSelector);
    const prevBtn = document.querySelector(prevButtonSelector);
    const nextBtn = document.querySelector(nextButtonSelector);

    const scrollAmount = 600;

    prevBtn.addEventListener("click", () => {
        scroll.scrollLeft -= scrollAmount;
    });

    nextBtn.addEventListener("click", () => {
        scroll.scrollLeft += scrollAmount;
    });
}


// 호출
document.addEventListener("DOMContentLoaded", () => {
    scrollImg({
        itemSelector: ".bigArticleScroll",
        prevButtonSelector: ".prevBigArticle",
        nextButtonSelector: ".nextBigArticle"
    });

    scrollImg({
        itemSelector: ".smallArticleScroll",
        prevButtonSelector: ".prevSmallArticle",
        nextButtonSelector: ".nextSmallArticle"
    });
});
