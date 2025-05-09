$(document).ready(async () => {
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
    if(currnentUser == null)
    {
        alert("로그인 한 유저가 존재하지 않습니다.");
        return;
    }

    let orderList = currnentUser.orderList;

    if(orderList == null || orderList.length == 0)
    {
        console.log(orderList);
        console.log(`주문 내역이 없습니다. 가상 데이터로 표기를 진행합니다.`);

        let readJson = await fetch("../../json/orderList.json");

        let parseData = await readJson.json();

        console.log(readJson);
        console.log(parseData);

        orderList = parseData.orderList;
    }

    createOrderList(orderList, true);
})


function createOrderList(orderList, isDatSort) {
    const scrollerPnode = document.querySelector("#orderList");// 스크롤 생성 시 사용할 mask 객체
    let createdDate = "";

    for (let i = 0; i < orderList.length; i++) {
        if (isDatSort && createdDate != orderList[i].orderDate) {
            createdDate = orderList[i].orderDate;
            createDateItem(scrollerPnode, createdDate);
        }

        createProductItem(scrollerPnode, orderList[i]);
    }

}

function createDateItem(parentNode, dateString) {
    // if ($(`#date-${dateString}`) == null) {
    //     return;
    // }
    //예외는 나중에 잡는다. 딱대 

    let newDiv = document.createElement("div");
    let newSpan = document.createElement("span");

    let year = dateString.substring(0, 4);
    let month = dateString.substring(4, 6);
    let day = dateString.substring(6, 8);

    newSpan.innerHTML = `${year}-${month}-${day}`;
    newDiv.append(newSpan);
    newSpan.id = `date-${dateString}`;
    //newSpan.addClass("scrollerItemHeader");

    newSpan.classList.add("scrollerItemHeader");
    parentNode.append(newDiv);
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
    itemOptionDiv.innerHTML = `${product.productOption}`;
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
