// 이미지 스크롤
function scrollImg(itemSelector, prevButtonSelector, nextButtonSelector) {
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


///해당 메서드를 구현하였으나 사용하지 않았습니다. 
// 아래 메서드 정리해주세요. 

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

            // 새로 로드된 내용에 대해 함수 재호출(시작)
            scrollImg(".bigArticleScroll", ".prevBigArticle", ".nextBigArticle");
            scrollImg(".smallArticleScroll", ".prevSmallArticle", ".nextSmallArticle");

            heart();

            // 새 페이지에 슬라이드 넘기기 적용
            new bootstrap.Carousel(document.querySelector('#visualSlider'), {
                interval: 3000,
                ride: 'carousel'
            });

            // 전체 상품 수 세기 + 출력
            const productCount = document.querySelectorAll(".products article").length;
            const summary = document.querySelector(".productNumbers");
            if (summary) {
                summary.textContent = `전체 ${productCount}개`;
            }

            // 최근 본 상품 클릭 이벤트 바인딩
            setupRecentProductsTracking();

            // (필요 시 최근 본 상품 목록 다시 그림 — 단, 첫 페이지에서만 할 수도 있음)
            renderRecentProducts();

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


//해당 메서드도 구현되었으나, 사용되지 않았습니다. 
//메서드 진행 부탁드리겠습니다.

// json 상품정보 연동 
async function applyProductInfo(num) {
    let productList = await getProductList();
    let bigArticles = document.querySelectorAll('.bigArticle');
    let smallArticles = document.querySelectorAll('.smallArticle');

    // big article
    bigArticles.forEach((article, idx) => {

        let calculIndex = (num - 1) * 6 + idx + 48

        // productList 48 ~ 83 큰 사진
        let product = productList.productList[calculIndex];

        if (!product) return;


        let linkTag = article.querySelector("#linkTag");
        linkTag.setAttribute("data-index", calculIndex);

        linkTag.addEventListener('click', (event)=>
            {
                event.preventDefault();
                setClickItem(calculIndex);
                window.location.href = "../p_productDetail/product_detail.html"
            });



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
        let calculIndex = (num - 1) * 8 + idx;
        // productList 0~ 47 작은 사진
        let product = productList.productList[calculIndex];

        if (!product) return;

        // 상품 정보 보내기 
      
        let linkTag = article.querySelector("#linkTag");
        linkTag.setAttribute("data-index", calculIndex);

        linkTag.addEventListener('click', (event)=>
            {
                event.preventDefault();
                setClickItem(calculIndex);
                window.location.href = "../p_productDetail/product_detail.html"
            });

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

//위 메서드와 동작이 동일한 부분이 있습니다. 
// //위 메서드를 모듈화 시켰으면 해당 메서드를 활용하는 편이 더 좋았을 것입니다.

async function applyProductFirst() {
    let productList = await getProductList();
    let bigArticles = document.querySelectorAll('.bigArticle');
    let smallArticles = document.querySelectorAll('.smallArticle');

    // big article
    bigArticles.forEach((article, idx) => {

        let calculIndex = idx * 6 + 48;

        let product = productList.productList[calculIndex];

        if (!product) return;

        let linkTag = article.querySelector("#linkTag");
        linkTag.setAttribute("data-index", calculIndex);

        linkTag.addEventListener('click', (event)=>
            {
                event.preventDefault();
                setClickItem(calculIndex);
                window.location.href = "../p_productDetail/product_detail.html"
            });

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
        let calculIndex = idx * 6;
        let product = productList.productList[calculIndex];
        if (!product) return;

        // 상품 정보 보내기 
        let linkTag = article.querySelector("#linkTag");
        linkTag.setAttribute("data-index", calculIndex);

        linkTag.addEventListener('click', (event)=>
            {
                event.preventDefault();
                setClickItem(calculIndex);
                window.location.href = "../p_productDetail/product_detail.html"
            });

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


function setupRecentProductsTracking() {
    const productLinks = document.querySelectorAll(".products a");

    productLinks.forEach(link => {
        link.addEventListener("click", () => {
            const img = link.querySelector("img");
            const name = link.querySelector("b")?.innerText || "";
            const price = link.querySelector(".price")?.innerText.replace(/[^0-9]/g, '') || "0";
            const href = link.getAttribute("data-linkPath") || "#";
            const index = link.getAttribute("data-index") || 0;

            
            console.log(href);

            const product = {
                name,
                price,
                img: img?.src || "",
                url: href,
                index : index
            };

            let recent = JSON.parse(localStorage.getItem("recentProducts")) || [];
            recent = recent.filter(p => p.name !== product.name);
            recent.unshift(product);
            if (recent.length > 5) recent.pop();
            localStorage.setItem("recentProducts", JSON.stringify(recent));
        });
    });
}

function renderRecentProducts() {
    const container = document.getElementById("recentContainer");
    if (!container) return;

    container.innerHTML = ""; // 이전 내용 초기화

    const recent = JSON.parse(localStorage.getItem("recentProducts")) || [];
    recent.forEach(p => {
        const item = document.createElement("a");
        item.className = "recentItem";
        item.href = p.url || "#";
        item.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <div>${p.name}</div>
            <div>${Number(p.price).toLocaleString()}원</div>
        `;

        item.index = p.index;

        item.addEventListener("click", (event)=>
            {
                event.preventDefault();

                setClickItem(item.index);
                window.location.href = item.href; 
            });

        container.appendChild(item);
    });
}


// 호출
document.addEventListener("DOMContentLoaded", () => {
    // 전체 상품 수 세기 + 출력
    const productCount = document.querySelectorAll(".products article").length;
    const summary = document.querySelector(".productNumbers");
    if (summary) {
        summary.textContent = `전체 ${productCount}개`;
    }

    scrollImg(".bigArticleScroll", ".prevBigArticle", ".nextBigArticle");
    scrollImg(".smallArticleScroll", ".prevSmallArticle", ".nextSmallArticle");

    // 하트
    heart();



    
    applyProductFirst();

    // 최근 본 상품 클릭 이벤트 

    setupRecentProductsTracking();
    renderRecentProducts();
});


