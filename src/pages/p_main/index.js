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
    const scrollItems = document.querySelectorAll(itemSelector);
    const prevBtns = document.querySelectorAll(prevButtonSelector);
    const nextBtns = document.querySelectorAll(nextButtonSelector);

    const scrollAmount = 600;

    scrollItems.forEach((scroll, index) => {
        const prevBtn = prevBtns[index];
        const nextBtn = nextBtns[index];

        if (prevBtn && scroll) {
            prevBtn.addEventListener("click", () => {
                scroll.scrollLeft -= scrollAmount;
            });
        }

        if (nextBtn && scroll) {
            nextBtn.addEventListener("click", () => {
                scroll.scrollLeft += scrollAmount;
            });
        }
    });
}

function loadGallery(galleryId) {
    const contentArea = document.getElementById('mainContent');

    fetch(galleryId)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            contentArea.innerHTML = html;

            // 새로 로드된 내용에 대해 함수 재호출
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

            heart(); 
        })
        .catch(error => {
            console.error('Error loading gallery:', error);
            contentArea.innerHTML = '<p>콘텐츠를 불러오는 데 실패했습니다.</p>';
        });
}

// 좋아요 함수
function heart() {
    const hearts = document.querySelectorAll(".heart");

    hearts.forEach(function (heart) {
        heart.addEventListener("click", function (e) {
            e.stopPropagation(); // 이벤트 버블링 방지
            e.preventDefault(); // a태그의 기본 이동 막기

            heart.classList.toggle("active"); // class 추가/제거
            heart.innerHTML = heart.classList.contains("active") ? "&#10084;" : "&#9825;";
            // ♥ (활성화) vs ♡ (비활성화)
        });
    });
}


// 아이템 정보(info) 바꾸는 함수 ??
function changeInfo() {
    const infos = document.querySelectorAll(".info");

    infos.forEach(info => {
        // 상품명 변경
        const title = info.querySelector("b");
        if (title) title.textContent = "새로운 상품명";

        // 원래 가격 변경
        const originalPrice = info.querySelector("del");
        if (originalPrice) originalPrice.textContent = "99,000원";

        // 할인가 변경
        const salePrice = info.querySelector(".price");
        if (salePrice) salePrice.textContent = "66,000원";
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

    heart();
});
