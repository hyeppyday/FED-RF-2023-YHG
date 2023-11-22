import { useEffect } from "react";

import '../css/fashion.css';
import { SwiperApp } from "../plugin/SwiperApp";

// 공통패션 서브페이지 컨텐츠 컴포넌트
export function Fashion(props) {
  // props.cat 서브카테고리명

  useEffect(() => {
    document.querySelector("body").style.overflow = "visible";
    document.querySelector("html").style.overflow = "visible";
  }, []);
  return (
    <>
    {/* 1. 배너영역 */}
      <section id="ban" className="page"><SwiperApp/></section>
      {/* 2. 신상품영역 */}
      <section id="c1" className="cont c1 men"></section>
      {/* 2-5. 상세보기박스 */}
      <div className="bgbx"></div>
      {/* 3. 패럴렉스 */}
      <section id="c2" className="cont c2 men"></section>
      {/* 4. 단일상품영역 */}
      <section id="c3" className="cont c3"></section>
      {/* 5. 스타일상품영역 */}
      <section id="c4" className="cont c4"></section>
    </>
  );
} ////////////////// Fashion 컴포넌트 ///////////////////////
