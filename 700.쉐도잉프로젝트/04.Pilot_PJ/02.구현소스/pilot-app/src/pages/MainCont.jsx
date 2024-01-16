import { useEffect, useLayoutEffect } from "react";
import { Banner } from "../modules/banner";

import $ from "jquery";

// 자동스크롤 JS 불러오기
// import { autoScroll } from "../func/jquery-autoScroll";
import { evtFn, wheelFn , initSet, zeroPno } from "../func/jquery-autoScroll";
// 드래그 배너 JS 불러오기
import { dragBanner } from "../func/drag_banner";
import { FashionIntro } from "../modules/FashionIntro";

// 메인페이지 컨텐츠 컴포넌트
export function MainCont() {

  // 처음 로딩시 스크롤 상단이동 ////////
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  },[]);
  
  // 메인 페이지 일때만 자동스크롤 기능 적용함
  useEffect(() => {
    // 랜더링 후 한번만 적용!
    // console.log("랜더링OK");

    // 중요 !!!!!!!!!!!!!!!!!!
    // 특정 이벤트를 설정해제하고자 할때
    // 반드시 그 이벤트 설정은 JS파일 내부에서 하지 말고
    // 리액트 함수에서 JS함수를 호출하는 형태로 해야
    // 해제 메서드인 removeEventListener가 유효함
    if($(window).width()>800){
      // 자동스크롤 이벤트 설정하기
      window.addEventListener("wheel", wheelFn);
      // autoScroll();
  
      // 메뉴 + 인디케이터 이벤트 설정함수 호출
      evtFn();
  
      // 초기화 함수호출 : 조건 (모바일 아닐때)
      // 모바일은 가로크기 800px 이하
      initSet();
  
      // 페이지 번호 초기화 호출
      zeroPno();

    }

    // 드래그 배너 호출
    dragBanner();

    // 컴포넌트 소멸자 : 이 컴포넌트가 삭제될때 호출됨 //
    return () => {
      console.log("난 소멸했어~");
      // 이 페이지에서만 필요했던 자동스크롤 이벤트 해제
      window.removeEventListener("wheel", wheelFn);

      // 메인 페이지에만 사용되는 로고 클릭시 상단이동 이벤트 해제
      // 제이쿼리로 특정요소에 걸어준경우 해제는 off(이벤트명)
      $("#logo a").off("click");
      $(".gnb li").off("click").removeClass('on');
      $(document).off('keydown');
    };
  }, []); ////////////// useEffect /////////////////

  return (
    <>
      {/* 1. 배너 페이지 */}
      <section
        id="ban"
        className="page none-sel"
        style={{ background: "lightblue" }}
      >
        <Banner />
      </section>

      {/* 2. 남성패션 페이지 */}
      <section className="page">
        <FashionIntro cat="men" subcat="etc"/>
      </section>

      {/* 3. 여성패션 페이지 */}
      <section className="page">
        <FashionIntro cat="women" subcat="etc"/>
      </section>

      {/* 4. 스타일패션 페이지 */}
      <section className="page">
        <FashionIntro cat="style" subcat="etc"/>
      </section>

      {/* 메인에만 나오는 사이드 인디케이터 */}
      <nav className="indic">
        <ul>
          <li className="on">
            <a href="#ban">
              <span>배너</span>
            </a>
          </li>
          <li>
            <a href="#men">
              <span>남성의류</span>
            </a>
          </li>
          <li>
            <a href="#women">
              <span>여성의류</span>
            </a>
          </li>
          <li>
            <a href="#style">
              <span>스타일</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
} //////// MainCont 컴포넌트 ///////
