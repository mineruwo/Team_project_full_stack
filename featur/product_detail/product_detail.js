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

});