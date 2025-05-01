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

// 페이지 로드
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

            // 새 페이지에 슬라이드 적용
            new bootstrap.Carousel(document.querySelector('#visualSlider'), {
                interval: 3000,
                ride: 'carousel'
              });

            // 페이지에 따라 다른 gallery 사진
            switch (galleryId) {
                case 'galleryCoat.html':
                    applyProductInfo(1);
                    break;
                case 'galleryJacket.html':
                    applyProductInfo(2);
                    break;
                case 'galleryJeans.html':
                    applyProductInfo(3);
                    break;
                case 'galleryShirts.html':
                    applyProductInfo(4);
                    break;
                case 'gallerySlacks.html':
                    applyProductInfo(5);
                    break;
                case 'galleryTshirts.html':
                    applyProductInfo(6);
                    break;
                default:
                    applyProductInfo(1);
            }
        })
        .catch(error => {
            console.error('Error loading gallery:', error);
            contentArea.innerHTML = '<p>콘텐츠를 불러오는 데 실패했습니다.</p>';
        });
}

// 좋아요
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

// json 상품정보 연동 
async function applyProductInfo(num) {
    let productList = await getProductList();
    let bigArticles = document.querySelectorAll('.bigArticle');
    let smallArticles = document.querySelectorAll('.smallArticle');

    // big article
    bigArticles.forEach((article, idx) => {
        // productList 48 ~ 83 큰 사진
        let product = productList.productList[(num-1) * 6 + idx + 48];
        console.log((num-1) * 6 + idx + 48);
        if (!product) return;

        console.log(idx);
        console.log((num-1) * 6 + idx + 48);

        let imgElement = article.querySelector('.thumb img');
        if (imgElement) {
            imgElement.src = product.imageUrl;
        }

        let infoElement = article.querySelector('.info');
        if (infoElement) {
            infoElement.querySelector('b').textContent = product.productName;
            infoElement.querySelector('del').textContent = product.oldPrice;
            infoElement.querySelector('.price').textContent = product.price;
        }
    });

    // small article
    smallArticles.forEach((article, idx) => {
        // productList 0~ 47 작은 사진
        let product = productList.productList[(num-1) * 8 + idx];
        if (!product) return;

        let imgElement = article.querySelector('.thumb img');
        if (imgElement) {
            imgElement.src = product.imageUrl;
        }

        let infoElement = article.querySelector('.info');
        if (infoElement) {
            infoElement.querySelector('b').textContent = product.productName;
            infoElement.querySelector('del').textContent = product.oldPrice;
            infoElement.querySelector('.price').textContent = product.price;
        }
    
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

    $("#mypage").click(()=>
        {
            if(!isLogin())
            {
                window.location.href = "../p_loginPage/logIn_signUp.html";
                return;
            }

            window.location.href = "../p_myPage/myPage.html";
        });   
});
