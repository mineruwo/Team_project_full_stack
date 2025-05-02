document.addEventListener('DOMContentLoaded', () => {

    //이미지 썸네일 메인이미지 반응 스크립트 
    const thumbnailList = document.querySelector('.thumbnail-list');// 썸네일 리스트 노드
    const mainImage = document.getElementById('mainImage');//main 이미지 노드
    const thumbnails = document.querySelectorAll('.thumbnail-list img');//썸네일 이미지 노드

    thumbnailList.addEventListener('click', (event) => {//썸네일 리스트를 클릭한다면 이벤트함수를 호출하겟다
        const target = event.target;//이벤트가 발생하는 타겟을 target이라는 함수에 정의하겟다

        if (target.tagName === 'IMG') {//만약 타겟의 태그네임이 img 라면 
            thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));//썸네일의 리스트를 돌며 active를 지운다
            target.classList.add('active');//클릭된 썸네일 리스트에 active를 추가한다 
            const newMainImageSrc = target.dataset.mainImage;//newmainImageSrc에 클릭된 썸네일이미지의 메인이미지 데이터를 정의한다.
            mainImage.src = newMainImageSrc;//메인이미지의 src를 newmainImageSrc를 대입한다. 
            mainImage.alt = target.alt.replace('썸네일', '메인 이미지');//메인이미지 alt에 클릭된 이미지의 alt를 대체한다
        }
    });
    // 사이드 바 찜버튼 활성화시 카운트 ++
    const likeBtn = document.querySelector('.likeBtn');//likeBtn의 클래스를 likeBtn에 대입한다 
    const likeCount = document.getElementById('likeCount');//likeCount ID를 likeCount 라는 함수에 대입

    let count = 0;//카운트에 0 대입 

    likeBtn.addEventListener('click', () => {//likeBtn에 클릭을 햇을때
        count++; //카운트가 1씩늘어난다
        likeCount.textContent = count;//likeCount의 출력문을 count만큼 출력한다 
    });

    const likeProduct = document.querySelector('.wishlist');
    const countLike = document.getElementById('countLike');

    let productCount = 0;

    likeProduct.addEventListener('click', () => {
        productCount++;
        countLike.textContent = productCount;

    });
    //네비게이션 바 스크립트 적용
    const tabs = document.querySelectorAll(".tab");//tab 클래스들을 tabs에 정의한다
    const contents = document.querySelectorAll(".tab-content");//tab-content들을 contents에 정의한다

    tabs.forEach(tab => { //각 탭내부를 돌며 
        tab.addEventListener("click", () => {//탭을클릭햇을시 
            tabs.forEach(t => +
                t.classList.remove("active"));//각탭의 active속성을 지우고
            contents.forEach(c => c.style.display = "none");//탭의 정보를 지우고

            // 현재 탭 활성화
            tab.classList.add("active");//클릭된탭에 active를 추가한다 
            const target = tab.getAttribute("data-tab");//target에 data-tab을 대입한다 
            document.getElementById(target).style.display = "block";//타겟이 가진 정보를 표시한다.
        });
    });

    // 호출

    document.querySelector('.prevSmallArticle').addEventListener('click', () => {
        document.querySelector('.smallArticleScroll').scrollBy({ left: -300, behavior: 'smooth' });
    });

    document.querySelector('.nextSmallArticle').addEventListener('click', () => {
        document.querySelector('.smallArticleScroll').scrollBy({ left: 300, behavior: 'smooth' });
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



