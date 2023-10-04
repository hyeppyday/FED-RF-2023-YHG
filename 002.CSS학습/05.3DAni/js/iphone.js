// 움직이는 폰 + 무한글자이동 JS - iphone.js

import dFn from "./dom.js";

/************************************* 
        [ 아이폰 영역오버시 회전기능 ]
        1. 화면에 10등분된 투명 영역을 구현
        2. 이 영역이 이벤트 대상이 됨
        3. 오버시 변경대상인 아이폰에 회전값 변경
        4. 트랜지션으로 애니메이션 설정적용!
        5. 애니메이션 후에 이벤트박스를 보이게함
        (최초 width:0 -> width:100vw)
    *************************************/

// 0. 데이터 셋팅 : x,y축 회전 각도를 배열에 셋팅 !
const iDeg = [
    // 상단영역
    [25,-60,'Bart_Simpson.png'],
    [25,-30,'Lisa_Simpson.png'],
    [25,0,'Maggie_Simpson.png'],
    [25,30,'Marge_Simpson.png'],
    [25,60,'simpson.png'],
    // 하단영역
    [-25,-60,'parisCity.jpg'],
    [-25,-30,'seoulCity.jpg'],
    [-25,0,'newyorkCity.jpg'],
    [-25,30,'seashore.jpg'],
    [-25,60,'house.png'],
];

// 1. 대상선정
// 1-1. 이벤트 대상 : .evt-box div
const evtBox = dFn.qsa(".evt-box div");
// 1-2. 변경대상 : .iphone
const iphone = dFn.qs(".iphone");
// 1-3. 스크린 : #screen
const screen = dFn.qs('#screen');

// console.log("대상:", evtBox, iphone);

// 2. 이벤트설정 : mouseenter(경계선 안에 들어갈 경우)
evtBox.forEach((ele,idx)=>
    dFn.addEvt(ele,'mouseenter',()=>seeMe(idx)));

// 3. 함수만들기
function seeMe(seq){ //seq - 순번받기
    // console.log('나를봐',event.currentTarget,seq);

    // 1. 변경 적용하기 : 폰 회전
    iphone.style.transform = 
    `rotateX(${iDeg[seq][0]}deg) rotateY(${iDeg[seq][1]}deg)`;

    // 트랜지션 변경하기
    iphone.style.transition = '.4s ease-out';

    // 2. 변경 적용하기 : 배경화면 변경
    screen.style.backgroundImage  = `url(../images/${iDeg[seq][2]})`;
    screen.style.backgroundColor = '#fff'
} //////////////// seeMe //////////////////////////