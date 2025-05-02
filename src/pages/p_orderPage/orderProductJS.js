$(document).ready( async ()=>
    {
        console.log("jquery");
        if(!isLogin())
        {
            alert("로그인이 필요한 페이지 입니다.");

            window.location.href =  "../p_loginPage/logIn_signUp.html"
            return;
        }
        let currentUser = currentLoginInfo();

        let listNode = document.querySelector(".orderListDiv");

        let itemList = [];

        let item1 = await getProductInfo(0);
        itemList.push(item1);
        let item2 = await getProductInfo(4);
        itemList.push(item2);
        let item3 = await getProductInfo(3);
        itemList.push(item3);
        
        createItem(item1, listNode);
        createItem(item2, listNode);
        createItem(item3, listNode);

        let sumValue = 0;
        itemList.forEach(elem => 
            {
                sumValue += elem.amount;
            });

        $("#sumValue").text(`총 금액 : ${sumValue.toLocaleString()}원`);
        
      

        console.log(currentUser);
        $("#address").text(currentUser.address);

        $("#buyButton").click(()=>
            {
                alert("미구현 기능입니다.");
            })
    });

    function createItem(productInfo, parentNode)
    {
        console.log(productInfo);
           
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("orderProductItem");
    
        let itemImageDiv = document.createElement("div");
        itemImageDiv.classList.add("orderProductPhoto");
    
        let itemImage = document.createElement("img");
        itemImage.src = productInfo.imageUrl;
        itemImage.classList.add("img-fluid");
        itemImage.classList.add("rounded");
    
        itemImageDiv.append(itemImage);
    
        let itemDetailDiv = document.createElement("div");
        itemDetailDiv.classList.add("orderProductInfo");
    
        let itemTitleDiv = document.createElement("div");
        itemTitleDiv.innerHTML = `상품명 : ${productInfo.productName}`;
        itemTitleDiv.classList.add("orderProductTitle");
    
        let itemCompanyDiv = document.createElement("div");
        itemCompanyDiv.innerHTML = `옵션 : ${productInfo.productOption}`;
        itemCompanyDiv.classList.add("orderProductOption");
    
        let itemOptionDiv = document.createElement("div");
        itemOptionDiv.innerHTML = `가격 : ${productInfo.amount.toLocaleString()}원`;
        itemOptionDiv.classList.add("orderProductPrice");
    
        itemDetailDiv.append(itemTitleDiv);
        itemDetailDiv.append(itemCompanyDiv);
        itemDetailDiv.append(itemOptionDiv);
    
        itemDiv.append(itemImageDiv);
        itemDiv.append(itemDetailDiv);
    
        parentNode.append(itemDiv);
    }