// 보그 PJ - 공통 모듈 JS : common.js

// DOM 메서드
import dFn from './dom.js';

// 상단,하단 공통 데이터 불러오기
import tData from './data/com_module.js';




  // 0. 스크롤바 트랙을 잡고 위치이동시 위치값 반영
  dFn.addEvt(window, "mouseup", () => setPos(window.scrollY));
  //////// mouseup /////////////
  
  // 0. 키보드 방향키 이동시 위치값 반영
  dFn.addEvt(window, "keyup", () => setPos(window.scrollY));
  //////// mouseup /////////////


// 대상선정: .common-area
const comArea = dFn.qsa('.common-area');

// console.log(tData,comArea);

// 상단영역 html 넣기
comArea[0].innerHTML = tData.topArea;
// 하단영역 html 넣기
comArea[1].innerHTML = tData.footerArea;



