$(document).ready(function(){
  document.getElementsByClassName("cartNum")[0].textContent = parseCookie("productImg").length;
  // 스크롤바
  let scrollBar = document.querySelector('#scrollBar');
  let yOffset = 0;
  let mouseClicked = false;
  let scrollY_percent = window.scrollY / document.body.offsetHeight;
  let box_height = window.innerHeight * window.innerHeight / document.body.offsetHeight;
  let bodyInitialHeight = document.body.offsetHeight;


  scrollBar.style.height = box_height + "px";
  scrollBar.style.top=scrollY_percent * window.innerHeight + "px";
  
  
  //scrollBar height를 window 전체 height에 따라 변경
  // window.addEventListener('resize', function(){
  //   scrollBar.style.height = box_height + "px";
  //   scrollBar.style.top=scrollY_percent * window.innerHeight + "px";
  // });
  
  let isScroll = null;  
  window.addEventListener('scroll', function (e) {
    // 브라우저 로드 직후 문서 높이와 현재 높이 비교한 후 스크롤바 높이 조정
    if(bodyInitialHeight != document.body.offsetHeight) {
      scrollBar.style.height = box_height + "px";
      scrollBar.style.top=scrollY_percent * window.innerHeight + "px";
    }
    //window.scrollY=스크롤 바 top 부분 px 로 계산
    //window.innerHeight = vh(margin 제외) 계산
    //document.body.offsetHeight = 총 body height 계산
  
    //scrollBar 위치를 전체 window 전체 height에 대한 비율 계산.
    scrollY_percent = window.scrollY / document.body.offsetHeight;
    if(!mouseClicked){
      if (scrollY_percent < 0) { //margin padding 때문에 scrollY 가 0 일때 document.body.offsetHeight이 1vh 보다 크게 되어 음수가 잡히는 경우 배제.
        scrollY_percent = 0;
        scrollBar.style.top = scrollY_percent * window.innerHeight + "px";
        //div가 fixed 된 화면 내에서 scroll bar 가 움직인 px 만큼 움직임
      }
      scrollBar.style.top = scrollY_percent * window.innerHeight + "px";
    }
    scrollBar.classList.add("scrolling");
    if(isScroll == null){
      isScroll = setTimeout(scrolling, 1000);// objectID
    }else{
      clearTimeout(isScroll);
      isScroll = setTimeout(scrolling, 1000);
    }
  });

  function scrolling(){
    scrollBar.classList.remove("scrolling");
  }

  scrollBar.addEventListener("mouseenter", ()=>{
    if(document.body.offsetHeight != bodyInitialHeight) {
      scrollBar.style.height = box_height + "px";
      scrollBar.style.top=scrollY_percent * window.innerHeight + "px";
    }
  })
  

  // 스크롤바 드래그
  scrollBar.addEventListener("mousedown",(event) => {
    box_height = window.innerHeight * window.innerHeight / document.body.offsetHeight;
    scrollBar.classList.add("drag");
    scrollBar.style.height = box_height + "px";
    $('.main').add('.header').add('.footer').css("user-select", "none");
    yOffset = event.offsetY;
    mouseClicked = true;

    window.addEventListener("mousemove", function(){
    //scrollBar 위치를 window 전체 height에 대한 비율 계산.

      window.addEventListener("mouseup", () => {
        scrollBar.classList.remove("drag");
        $('.main').add('.header').add('.footer').css("user-select", "auto");
        return mouseClicked = false;
      });

      //mouse 움직임 y좌표 계산하여 screen 과 scrollbar 이동.
      if(mouseClicked){
        let y = this.event.clientY;
        if(y < yOffset){
          scrollBar.style.top = "0px";
          scrollTo(0,0);
        }else if(window.innerHeight - box_height * (1 - yOffset / box_height) < y){
          scrollBar.style.top = (window.innerHeight - box_height) + "px";
          scrollTo(0,document.body.offsetHeight - window.innerHeight);
        }else{
          scrollBar.style.top = y - yOffset + "px";
          scrollTo(0,(y * document.body.offsetHeight / window.innerHeight) - (window.innerHeight * yOffset / box_height));
        }
      }
    });
  });

  // 스크롤바 빈 공간 클릭 시 이동
  let isHold = null;
  let scrollBarContainer = document.getElementsByClassName("scrollBarContainer")[0];
  scrollBarContainer.addEventListener("mousedown",(e)=>{
    clearInterval(isHold);
    scrollBarContainer.classList.add("hold");
    let nowCoodY = e.pageY;
    isHold = setInterval(()=>{
      let scrollTop = Number(scrollBar.style.top.substring(0,scrollBar.style.top.length-2));
      let scrollHeight = Number(scrollBar.style.height.substring(0,scrollBar.style.height.length-2));
      if(e.clientY < scrollTop){
        scrollBar.style.top = scrollTop - scrollHeight + "px";
        scrollTo(0,nowCoodY - window.innerHeight);
        nowCoodY -= window.innerHeight;
      }else if(e.clientY >= (scrollTop + scrollHeight)){
        scrollBar.style.top = scrollTop + scrollHeight + "px";
        scrollTo(0,nowCoodY + window.innerHeight);
        nowCoodY += window.innerHeight;
      }
    },300);
  })
  scrollBarContainer.addEventListener("mouseup",()=>{
    clearInterval(isHold);
    scrollBarContainer.classList.remove("hold");
  })
  scrollBarContainer.addEventListener("mouseleave",()=>{
    clearInterval(isHold);
    scrollBarContainer.classList.remove("hold");
  })
  

  // 아래 스크롤 시 헤더 숨기기
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;  // 헤더 사라지는 위치 설정
  var navbarHeight = $('header').outerHeight();
  var header = $('header');

  $(window).scroll(function (event) {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 200);

  function hasScrolled() { 
    var st = $(this).scrollTop();

    // 스크롤 위치 차이가 delta보다 작은 경우 반환
    if (Math.abs(lastScrollTop - st) <= delta) {
      return;
    }

    if (st > lastScrollTop && st > navbarHeight) {
      // 스크롤 다운 시 헤더를 서서히 숨김
      header.stop().fadeOut(100); // 100ms 동안 서서히 사라지게
    } else {
      if (st + $(window).height() < $(document).height()) {
        // 스크롤 업 시 헤더를 서서히 표시
        header.stop().fadeIn(100); // 100ms 동안 서서히 나타나게
      }
    }

    lastScrollTop = st;
  }



  // 플로팅 버튼
  // 영역에서 나가면 active 클래스 제거
  $('.floatBtnContainer').mouseleave(function(){
    $('.floatBtnBox').removeClass('active');
  })

  // 버튼 수납 토글
  $('.buttonBox').click(function(){
    $('.floatBtnBox').toggleClass('active');
  });

  // 최근 본 상품 보기
  $('.viewBtn').click(function(e){
    $('#recentView').fadeToggle();
  })
  
  // 상단으로 이동
  $('.topBtn').click(function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 500) // 500ms 동안 이동
    return false;
  });

  // 하단으로 이동
  $('.bottomBtn').click(function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(document).height()
    }, 500) // 500ms 동안 이동
    return false;
  });

  document.getElementsByClassName("cartNum")[0].textContent = parseCookie("cartImgSrc_").length;

});



// footer 찾아오는 길 Google Map 지도 api
let map;
let marker;

async function myMap() {
  const position = { lat: 37.569681, lng: 126.984281 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
  map = new Map(document.getElementById("googleMap"), {
    center: position,
    zoom: 20,
    mapId: "DEMO_MAP_ID",
    mapTypeControl: false,
  });

  marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "더조은",
  });
}

myMap();

function mapOpen_Event() {
  let mapOpen = document.getElementsByClassName("mapOpen")[0];
  let target_Div = document.getElementById("mapModal");

  mapOpen.addEventListener("click", ()=>{
    target_Div.style.display = "flex";
  });
}

mapOpen_Event();

function mapCloseBtn_Event() {
  let closeBtn = document.getElementsByClassName("closeBtn")[0];
  let mapBg = document.querySelectorAll("#mapModal .bg")[0];
  let target_Div = document.getElementById("mapModal");

  closeBtn.addEventListener("click", ()=>{
    target_Div.style.display = "none";
  });

  mapBg.addEventListener("click", ()=>{
    target_Div.style.display = "none";
  });
}

mapCloseBtn_Event();