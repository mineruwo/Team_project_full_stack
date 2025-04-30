document.addEventListener('DOMContentLoaded', () => {
    
    //이미지 썸네일 메인이미지 반응 스크립트 
    const thumbnailList = document.querySelector('.thumbnail-list');
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail-list img');

    thumbnailList.addEventListener('click', (event) => {
        const target = event.target;

        if (target.tagName === 'IMG') {
            thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
            target.classList.add('active');
            const newMainImageSrc = target.dataset.mainImage;
            mainImage.src = newMainImageSrc;
            mainImage.alt = target.alt.replace('썸네일', '메인 이미지');
        }
    });
    // 사이드 바 찜버튼 활성화시 카운트 ++
    const likeBtn = document.querySelector('.likeBtn');
    const likeCount = document.getElementById('likeCount');

    let count = 0;

    likeBtn.addEventListener('click', () => {
        count++;
        likeCount.textContent = count;
    });

    const likeProduct= document.querySelector('.wishlist');
    const countLike = document.getElementById('countLike');

    let productCount = 0;

    likeProduct.addEventListener('click', () => {
        productCount++;
        countLike.textContent =productCount;
        
    });
 //네비게이션 바 스크립트 적용
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");
  
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.style.display = "none");
  
        // 현재 탭 활성화
        tab.classList.add("active");
        const target = tab.getAttribute("data-tab");
        document.getElementById(target).style.display = "block";
      });
    });

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

    document.querySelector('.prevSmallArticle').addEventListener('click', () => {
        document.querySelector('.smallArticleScroll').scrollBy({ left: -300, behavior: 'smooth' });
      });
      
      document.querySelector('.nextSmallArticle').addEventListener('click', () => {
        document.querySelector('.smallArticleScroll').scrollBy({ left: 300, behavior: 'smooth' });
      });

});


