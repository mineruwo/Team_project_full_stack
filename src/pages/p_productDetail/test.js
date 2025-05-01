document.addEventListener('DOMContentLoaded', async () => {
    let index = getClickItem(); // 선택된 상품 인덱스 가져오기
    const product = await getProductInfo(index);

    console.log(product);

    if (product) {
        renderThumbnails(product);
        renderMainImage(product);
        fillSidebarWithProduct(product);
        setupThumbnailClick(product);
    }
});

// --- 썸네일 목록 렌더링 ---
function renderThumbnails(product) {
    const thumbnailList = document.querySelector('.thumbnail-list');
    thumbnailList.innerHTML = '';
    console.log("call => renderThumbnails");

    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.dataset.mainImage = product.imageUrl;
    img.alt = product.productName + " 썸네일"; // alt 추가
    thumbnailList.appendChild(img);
}

// --- 메인이미지 설정 ---
function renderMainImage(product) {
    const mainImage = document.getElementById('mainImage');
    console.log("call => renderMainImage");

    mainImage.src = product.imageUrl;
    mainImage.alt = product.productName;
}

// --- 사이드바 상품 정보 채우기 ---
function fillSidebarWithProduct(product) {
    console.log("call => fillSidebarWithProduct");

    const brandNameEl = document.querySelector('.brand-name');
    const productNameEl = document.querySelector('.product-name');
    const categoryEl = document.querySelector('.category');
    const originalPriceEl = document.querySelector('.original-price');
    const salePriceEl = document.querySelector('.sale-price');

    brandNameEl.textContent = product.companyName || '브랜드명';
    productNameEl.textContent = product.productName || '상품 명';
    categoryEl.textContent = product.productOption || '카테고리';
    originalPriceEl.textContent = `${(product.amount || 0).toLocaleString()}원`;
    salePriceEl.textContent = `${(product.amount || 0).toLocaleString()}원`;
}

// --- 썸네일 클릭 시 메인이미지 + 사이드바 업데이트 ---
function setupThumbnailClick(product) {
    console.log("call => setupThumbnailClick");

    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelector('.thumbnail-list');

    thumbnails.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'IMG') {
            document.querySelectorAll('.thumbnail-list img').forEach(img => img.classList.remove('active'));
            target.classList.add('active');

            mainImage.src = target.dataset.mainImage;
            mainImage.alt = target.alt.replace('썸네일', '메인 이미지');

            fillSidebarWithProduct(product);
        }
    });
}