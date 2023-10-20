// 달력 구현 JS - calendar.js

// DOM 메서드 //////////
const dFn = {
  qs: (x) => document.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsEl: (el, x) => el.querySelector(x),
  qsaEl: (el, x) => el.querySelectorAll(x),
  addEvt: (ele,evt,fn) => ele.addEventListener(evt,fn),
  cg: (x) => console.log(x),
  addZero: (x) => (x < 10 ? "0" + x : x),
  fm: (x) => `
    ${x.getFullYear()}-${dFn.addZero(x.getMonth() + 1)}-${dFn.addZero(
    x.getDate()
  )}(${week[x.getDay()]})`,
}; ////////////// dFn ///////////////////

// 요일 변경배열
const week = ["일", "월", "화", "수", "목", "금", "토"];

// 달력함수 호출
makeDallyeok();

function makeDallyeok() {
  dFn.cg("달력만들어!");

  // 1. 변수셋팅 //
  // (1) 변경할 현재날짜 객체
  const currDate = new Date();
  // (2) 오늘 날짜 객체
  const today = new Date();
  // (3) 년도요소 : .yearTit
  const yearTit = dFn.qs(".yearTit");
  // (4) 월요소 : .monthTit
  const monthTit = dFn.qs(".monthTit");
  // (5) 일요소 : .dates
  const dates = dFn.qs(".dates");
  // (6) 날짜넣을 배열변수
  const dateSet = [];
  // (7) html 코드 저장변수
  let hcode = '';

  // dFn.cg(yearTit);
  // dFn.cg(monthTit);
  // dFn.cg(dates);

  // 2. 함수 만들기
  // (1) 달력 초기화 구성함수
  const initDallyeok = () => {
    // 변수 초기화
    // 날짜 배열초기화 : splice(시작순번, 개수)
    // -> 배열변수.splice(0) 첫배열부터 모두지움!
    dateSet.splice(0);

    // html코드 변수 초기화
    hcode ='';


    // 현재년
    let cYr = currDate.getFullYear();
    // 현재달
    let cMt = currDate.getMonth();

    // [선택달 끝날짜, 첫날짜 알아오기]
    // new Date(년도, 월, 옵션)
    // 전달값
    // (1)년도
    // (2)월
    // (3) 0 -선택달끝날짜 / 1 - 다음달첫날짜

    // 1. 전달마지막 날짜(옵션:0) -> 달력처음 전달끝쪽날짜표시
    const prevLast = new Date(cYr, cMt, 0);

    dFn.cg("전달끝날짜:" + dFn.fm(prevLast));

    // 2. 현재달 첫째날짜(옵션:1->전달로 셋팅)
    // -> 달력 전달 셋팅을 위한 요일 구하기 !!
    const thisFirst = new Date(cYr, cMt, 1);

    dFn.cg("현재달첫날짜:" + dFn.fm(thisFirst));

    // 3. 현재달 마지막 날짜 (옵션:0)
    const thisLast = new Date(cYr, cMt + 1, 0);

    dFn.cg("현재달끝날짜:" + dFn.fm(thisLast));

    // 4. 년도 표시하기
    yearTit.innerHTML = cYr;

    // 5. 월 표시하기
    monthTit.innerHTML = cMt + 1;

    // 6. 날짜 데이터 태그 구성하기
    // 6-1. 전달 날짜 앞쪽 채우기
    // 조건 : 현재달 첫 날짜 요일이 0 이 아니면 내용 있음!
    // -> 왜 0인가? 0은 일요일이므로 0이면 앞에 내용 없음!

    let fDay = thisFirst.getDay();

    dFn.cg("이번달첫날요일:" + fDay);
    if (fDay != 0) {
      // 만약 요일 번호가 0이 아니면 for문 돌림
      for (let i = 0; i < fDay; i++) {
        // 반복횟수만큼 배열 앞쪽에 추가
        // 앞에 추가 메서드 : unshift()
        dateSet.unshift(`
                <span style="color:#ccc" class="bm">
                ${prevLast.getDate() - i}
                </span>`);
        // 전달 마지막 날짜 - for문 i값 (0,1,2,...)
      } //////////// for /////////////
    } //////////// if /////////////////

    // 6-2. 현재월 삽입하기
    // 반복문 구성 : 현재월 1일부터 마지막 날짜까지 반복 배열 추가
    for (let i = 1; i <= thisLast.getDate(); i++) {
      dateSet.push(i);
    } ////////////// for //////////////////

    // 6-3. 다음달 나머지 칸 삽입하기 /////
    // 다음달은 클래스 'am'으로 구분
    // 반복구성 : 1부터 2주분량 정도 넣는다
    for (let i = 1; i <= 14; i++) {
      dateSet.push(`
            <span style="color:#ccc" class="am">${i}</span>
            `);
    } ///////////// for ////////////////////

    // dFn.cg("날짜배열:" + dateSet);

    // 7. 날짜배열로 날짜태그 구성하여 출력하기
    // 7일 * 6주 = 42개
    
    for (let i=0;i<42;i++){

      // 오늘 날짜와 같은경우 클래스 "today"넣기
      if(
          // 년,월,일 이 모두 일치하는 오늘만 표시
          // (1) 오늘 날짜 == 배열값날짜 AND
          today.getDate() == dateSet[i] && 
          // (2) 현재 달 == 선택달 AND
          today.getMonth() == currDate.getMonth() &&
          // (3) 현재 년도 == 선택 년도
          today.getFullYear() == currDate.getFullYear() 
      ){

        hcode += `<div class="date today">${dateSet[i]}</div>`;
      }//////////////// if ///////////////////
      else{
        
        hcode += `<div class="date">${dateSet[i]}</div>`;
      }///////////// else /////////////////////

    }///////////// for ////////////////

    // 8. 날짜태그 출력
    dates.innerHTML = hcode;


    // dates.innerHTML = dateSet
    //   .map((v, i) => (i < 42 ? `<div class="date">${v}</div>` : ""))
    //   .join("");

       // dFn.cg('날짜배열:'+dateSet.map((v,i)=>
        // i<42?`<div class="date">${v}</div>`:'').join(''));

        dFn.cg(dateSet);
        dFn.cg(hcode);

    // 9. 날짜 정보를 사용하도록 셋팅하기 /////
    // (1) 대상선정 : .date -> 위에서 새로 담겼으므로 새로 읽기
    let newDate = dFn.qsa('.date');
    // console.log(newDate);

    // (2) 각 날짜 .date요소에 링크 설정하기
    newDate.forEach(ele=>{
      dFn.addEvt(ele,'click',()=>{
        // 1. 년도 읽기
        let nowY = yearTit.innerText;
        // 2. 월 읽기
        let nowM = monthTit.innerText;
        // 3. 일 읽기
        let nowD = ele.innerText;
            
        
        // 4. 전달/다음달 구분하기
        let isSpan = dFn.qsEl(ele,'span');
        // console.log('span있니?',isSpan);
        
        // span이 있으면 true 처리
        if(isSpan){
          // span의 클래스가 'bm'인지 'am'인지 구분해서 년/월 계산
          let isAm = isSpan.classList.contains('am');
          if(isAm){ // 다음달 이므로 1더함
            nowM++;
            if(nowM==13) {
              nowM = 1 // 13월은 없으니까 1월로 처리되게
              nowY++; // 1월이 되면서 년도는 다음해로 변경되게
            } //////////////////// if //////////////////////
          }
          else{
            nowM--;
            if(nowM==0){
              nowM = 12 // 0월은 없으니까 전년도 12월로 처리되게
              nowY--; // 12월이 되면서 년도는 전년도로 변경되게
            }
          } //////////////////// else ///////////////////////
        }/////////////// if //////////////////

        // console.log(`${nowY}-${dFn.addZero(nowM)}-${dFn.addZero(nowD)}`);

        
        // 날짜구성하기 : yyyy-mm-dd
        let setDate = `${nowY}-${dFn.addZero(nowM)}-${dFn.addZero(nowD)}`;
        // 요일셋팅하기
        let setDay = new Date(setDate).getDay()
        console.log(setDate+`(${week[setDay]})`);

      }); /////////// click 함수 ///////////////////
    }); //////////////// forEach //////////////////
        
  }; ////////// initDallyeok //////////////


  // (2) 이전/다음 달력 출력하기 함수
  const chgCalendar = (num)=>{ // num(1이면 다음, -1이면 이전)
    console.log('달력변경 고고!');
    // 이전/다음달로 변경하여 initDallyeok() 함수호출 !!
    // getMonth() 월가져오기 / setMonth() 월셋팅하기!
    currDate.setMonth(currDate.getMonth()+num);
    initDallyeok();
  }; ////////////// prevCalendar /////////////


  // 3. 이벤트 설정하기 /////////////////////////////////////////
  // 이전버튼에 함수 연결하기
  dFn.addEvt(dFn.qs('.btnL'),'click',()=>chgCalendar(-1));
  // 다음버튼에 함수 연결하기
  dFn.addEvt(dFn.qs('.btnR'),'click',()=>chgCalendar(1));
  
  initDallyeok();
} ///////// makeDallyeok함수 /////////


