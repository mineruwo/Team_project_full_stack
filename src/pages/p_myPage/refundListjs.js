$(document).ready(() => {
    let transEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';
    $("#transitionPage").on(transEnd, () => {

    });

    $("#transitionPage").css(
        {
            "left": "100%",
            "transition": "500ms"
        }
    )

    let currnentUser = currentLoginInfo();

    let refundList = currnentUser.refundList;

    if(refundList == null || refundList == undefined || refundList.length == 0)
    {
        console.log("환불 데이터가 없습니다. 가상 데이터로 테스트를 진행합니다.");
        refundList = [
                {
                    "orderDate": "20250424",
                    "productName": "와이드 원턱 스웨트 쇼츠 블랙",
                    "productOption": "2(XL-2XL)",
                    "companyName": "모즈모즈",
                    "currentState": "환불 완료",
                    "imageUrl": "../../image/itemsImage/1.webp",
                    "productindex": 1
                },
                {
                    "orderDate": "20250424",
                    "productName": "원턱 린넨 라이크 와이드 밴딩 팬츠_Oatmeal",
                    "productOption": "L",
                    "companyName": "무드인사이드",
                    "currentState": "환불 신청 중",
                    "imageUrl": "../../image/itemsImage/2.webp",
                    "productindex": 2
                }
        ]
    }

    createOrderList(refundList, false);
})



function createOrderList(orderList, isDatSort) {
    const scrollerPnode = document.querySelector("#orderList");// 스크롤 생성 시 사용할 mask 객체
    let createdDate = "";

    console.log(orderList);

    for (let i = 0; i < orderList.length; i++) {
        if (isDatSort && createdDate != orderList[i].orderDate) {
            createdDate = orderList[i].orderDate;
            createDateItem(scrollerPnode, createdDate);
        }

        createProductItem(scrollerPnode, orderList[i]);
    }

}

function createProductItem(parentNode, product) {

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("scrollerItem");

    let itemImageDiv = document.createElement("div");
    itemImageDiv.classList.add("itemImage");

    let itemImage = document.createElement("img");
    itemImage.src = product.imageUrl;
    itemImage.classList.add("img-fluid");
    itemImage.classList.add("rounded");


    itemImageDiv.append(itemImage);

    let itemDetailDiv = document.createElement("div");
    itemDetailDiv.classList.add("itemDetail");

    let itemTitleDiv = document.createElement("div");
    itemTitleDiv.innerHTML = `${product.productName}`;
    itemTitleDiv.classList.add("itemDetailTitle");

    let itemCompanyDiv = document.createElement("div");
    itemCompanyDiv.innerHTML = `${product.companyName}`;
    itemCompanyDiv.classList.add("itemDetailDesc");

    let itemOptionDiv = document.createElement("div");
    itemOptionDiv.innerHTML = `${product.currentState}`;
    itemOptionDiv.classList.add("itemDetailOption");

    itemDetailDiv.append(itemTitleDiv);
    itemDetailDiv.append(itemCompanyDiv);
    itemDetailDiv.append(itemOptionDiv);

    itemDiv.append(itemImageDiv);
    itemDiv.append(itemDetailDiv);

    parentNode.append(itemDiv);
}

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {

    let transEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';

    $("#transitionPage").on(transEnd, () => {
        this.history.back();
    });

    $("#transitionPage").css(
        {
            "display": "block",
            "left": "0%",
            "transition": "500ms"
        }
    );
});
