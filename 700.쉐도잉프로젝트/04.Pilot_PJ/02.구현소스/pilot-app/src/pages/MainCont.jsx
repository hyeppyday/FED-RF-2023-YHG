import { useEffect } from "react";
import { Banner } from "../modules/banner";

// 자동스크롤 JS 불러오기
import { autoScroll } from "../func/jquery-autoScroll";
// 드래그 배너 JS 불러오기
import { dragBanner } from "../func/drag_banner";



// 메인페이지 컨텐츠 컴포넌트
export function MainCont() {
  // 메인 페이지 일때만 자동스크롤 기능 적용함
  useEffect(() => {
    // 랜더링 후 한번만 적용!
    console.log("랜더링OK");
    // 자동스크롤 호출
    autoScroll();
    // 드래그 배너 호출
    dragBanner();
    
  }, []); ////////////// useEffect /////////////////

  return (
    <>
      {/* 1. 배너페이지 */}
      <section id="ban" className="page" style={{ background: "lightblue" }}>
        <Banner />
      </section>
      <section className="page" style={{ background: "lightpink" }}></section>
      <section className="page" style={{ background: "chocolate" }}></section>
      <section className="page" style={{ background: "lightgreen" }}></section>
      <section className="page" style={{ background: "lightcoral" }}></section>
    </>
  );
} /////////////// MainCont 컴포넌트 /////////////////
