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

            // 새로 로드된 내용에 대해 함수 재호출(시작)
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
            // 새로 로드된 내용에 대해 함수 재호출(끝)

            // 새 페이지에 슬라이드 적용
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
        let product = productList.productList[(num - 1) * 6 + idx + 48];

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

    // small article
    smallArticles.forEach((article, idx) => {
        // productList 0~ 47 작은 사진
        let product = productList.productList[(num - 1) * 8 + idx];
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

async function applyProductFirst() {
    let productList = await getProductList();
    let bigArticles = document.querySelectorAll('.bigArticle');
    let smallArticles = document.querySelectorAll('.smallArticle');

    // big article
    bigArticles.forEach((article, idx) => {
        let product = productList.productList[idx * 6 + 48];

        if (!product) return;

        console.log(idx * 6 + 48);

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
        let product = productList.productList[idx * 6];
        if (!product) return;

        console.log(idx * 6);

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
    // 전체 상품 수 세기 + 출력
    const productCount = document.querySelectorAll(".products article").length;
    const summary = document.querySelector(".productNumbers");
    if (summary) {
        summary.textContent = `전체 ${productCount}개`;
    }

    // 최근 본 상품 (시작)
    const productLinks = document.querySelectorAll(".products a");
    productLinks.forEach(link => {
        link.addEventListener("click", () => {
            const img = link.querySelector("img");
            const name = link.querySelector("b")?.innerText || "";
            const price = link.querySelector(".price")?.innerText.replace(/[^0-9]/g, '') || "0";
            const href = link.getAttribute("href") || "#";

            const product = {
                name,
                price,
                img: img?.src || "",
                url: href
            };

            let recent = JSON.parse(localStorage.getItem("recentProducts")) || [];
            recent = recent.filter(p => p.name !== product.name);
            recent.unshift(product);
            if (recent.length > 5) recent.pop();
            localStorage.setItem("recentProducts", JSON.stringify(recent));
        });
    });

    const container = document.getElementById("recentContainer");
    const recent = JSON.parse(localStorage.getItem("recentProducts")) || [];
    recent.forEach(p => {
        const item = document.createElement("a");
        item.className = "recent-item";
        item.href = p.url || "#";
        item.innerHTML = `
                    <img src="${p.img}" alt="${p.name}">
                    <div>${p.name}</div>
                    <div>${Number(p.price).toLocaleString()}원</div>
                `;
        container.appendChild(item);
    });
    // 최근 본 상품 (끝)

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


    let isLoginUser = isLogin();

    $(".login>li")[0].innerHTML = `${isLoginUser ? "로그아웃" : "로그인"}`;

    $(".login").click(function () {

        if(isLoginUser)
        {   
            userLogout();
            alert("로그아웃 되었습니다.");
            console.log(isLoginUser);
            location.reload();
            return;
        }
        else
        {
            location.href = "../p_loginPage/login_signUp.html";
        }
        
    });


    applyProductFirst();
});


