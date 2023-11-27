// DC.com 레이아웃 컴포넌트 : 실제적인 최상위 컴포넌트임

import { FooterArea } from "./FooterArea";
import { MainArea } from "./MainArea";
import { TopArea } from "./TopArea";
import { useNavigate } from "react-router-dom";
import { useCallback, useLayoutEffect } from "react";

// Context API 불러오기
import { dcCon } from "../modules/dcContext";

export function Layout() {

    // 랜더링 후(화면보이기전) 실행구역 //////////
  useLayoutEffect(()=>{
    // 페이지 이동시 스크롤위치 상단이동
    window.scrollTo(0,0);
  }); /////////// useEffect ///////////


  // 라우터 이동객체설정
  const goNav = useNavigate();

  // 라우터 이동함수 : pgName - 페이지이름 / param - 전달값
  const chgPage = useCallback((pgName,param) => goNav(pgName,param),[]);
  // 메모이제이션 되는 TopArea 컴포넌트에 제공하는 함수가
  // useCallback을 사용한 메모이제이션 처리되어야 변경없는 것을
  // 체크하여 함수를 업데이트 하지 않는다!
  // useCallback(기존익명함수,[의존성])
  // -> 의존성 변수가 없을때 비워놓아도 효과가 있음(단, 형식은 맞춰야함)

   /********************************** 
   [컨텍스트 API 공유값 설정]
   1. chgPage 함수 : 라우터 이동기능   
   **********************************/
  return (
    <dcCon.Provider value={{ chgPage }}>
      {/* 메모이제이션 관리를 위해 함수를
      컨텍스트 방식이 아닌 속성으로 직접보냄! */}
      <TopArea chgPageFn={ chgPage }/>
      <MainArea />
      <FooterArea />
    </dcCon.Provider>
  );
} ////////////////// Layout /////////////////////
