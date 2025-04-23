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

// 슬라이더 넘기기 
function moveSlider() {
    const slides = document.querySelectorAll(".imgBox");
    const prevButton = document.querySelector(".prevSlide");
    const nextButton = document.querySelector(".nextSlide");

    let currentIndex = 0;

    // 처음 슬라이드 보이게
    slides[currentIndex].classList.add('visible');

    // 슬라이드 보여주는 함수
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('visible');
            slide.classList.remove('hiding');
        });

        slides[index].classList.add('visible');
    }

    // 다음 슬라이드
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // 이전 슬라이드
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

}

// Article 넘기기
function moveArticle() {
    const articles = document.querySelectorAll(".bigArticleBox");
    console.log(articles);
    const prevButton = document.querySelector(".prevArticle");
    const nextButton = document.querySelector(".nextArticle");

    let currentIndex = 0;

    // 처음 슬라이드 보이게
    articles[currentIndex].classList.add('visible');

    // 슬라이드 보여주는 함수
    function showArticle(index) {
        articles.forEach(article => {
            article.classList.remove('visible');
            article.classList.remove('hiding');
        });

        articles[index].classList.add('visible');
    }

    // 다음 슬라이드
    function nextArticle() {
        currentIndex = (currentIndex + 1) % articles.length;
        showArticle(currentIndex);
    }

    // 이전 슬라이드
    function prevArticle() {
        currentIndex = (currentIndex - 1 + articles.length) % articles.length;
        showArticle(currentIndex);
    }

    nextButton.addEventListener("click", nextArticle);
    prevButton.addEventListener("click", prevArticle);

}

// 호출
document.addEventListener("DOMContentLoaded", imgSlider);
document.addEventListener("DOMContentLoaded", moveSlider);
document.addEventListener("DOMContentLoaded", moveArticle);