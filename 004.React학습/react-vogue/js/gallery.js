// 보그 PJ 갤러리 페이지 JS - gallery.js

var swiper = new Swiper(".mySwiper", {
    autoplay: {
        // 자동 넘김 시간
        delay: 2500,
        // 상호작용(건들여놓기)에 대한 재가동 없애기 안씀(false)
        // 자동으로 움직이고있을때 사람이 건드려도 멈추지않고 계속 넘어가도록함
        disableOnInteraction: false,
      },
      // 루프 처리
      loop: true,
      // 한번에 보일 슬라이드 수
    slidesPerView: 3,
    // 슬라이드 간 사이간격
    spaceBetween: 30,
    pagination: {
        // 하단 블릿 (버튼)
      el: ".swiper-pagination",
      clickable: true,
    },
    // 양쪽 이동버튼
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // 화면 크기별 분기
      breakpoints: {
        // when window width is >= 200px
        200: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        // when window width is >= 700px
        700: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        // when window width is >= 1000px
        1000: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
  });

