// OPINION 의견 게시판 컴포넌트

import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// 게시판용 CSS
import "../../css/board.css";

// 컨텍스트 API 불러오기
import { dcCon } from "../modules/dcContext";

// 로컬스토리지 생성 JS
import { initData } from "../func/mem_fn";

// 제이쿼리 불러오기
import $ from "jquery";

// 기본 데이터 제이슨 불러오기
import baseData from "../data/board.json";
import { faL } from "@fortawesome/free-solid-svg-icons";

// 기본 데이터 역순정렬
baseData.sort((a, b) => {
  return Number(a.idx) === Number(b.idx)
    ? 0
    : Number(a.idx) > Number(b.idx)
    ? -1
    : 1;
});

// 초기데이터 로컬스에 셋업하기 (원본데이터) ///////////////////////////////////////
// 로컬스에 bdata가 있으면 orgData에 담고 아니면 baseDaata가 있으니 그걸 담음
let orgData;
// 로컬스가 있으면 그것 넣기
if (localStorage.getItem("bdata"))
  orgData = JSON.parse(localStorage.getItem("bdata"));
// 로컬스가 없으면 제이슨 데이터 넣기
else orgData = baseData;

// ////console.log(org);

///////////////// Board 컴포넌트 시작 !! /////////////////////////////
export function Board() {
  // 기본 사용자 정보 셋업 함수 호출
  initData();

  // 컨텍스트 API 사용하기
  // -> OPINION 메뉴 보드에 로그인 정보 불러올 수 있게 컨텍스트 사용
  // -> 현재 로그인 된 아이디 정보를 사용 가능(컨텍스트로 Layout컴포넌트에서 logSts 가져옴)
  const myCon = useContext(dcCon);

  console.log("로그인상태:", myCon.logSts);

  // [컴포넌트 전체 공통변수] /////////////
  // 1. 페이지 단위수 : 한 페이지 당 레코드수
  const pgBlock = 7;
  // 2. 전체 레코드수 : 배열데이터 총개수
  const totNum = baseData.length;
  ////console.log("페이지단위수:", pgBlock, "\n전체 레코드수:", totNum);

  // [ 상태관리 변수 셋팅 ] /////////////

  // 1. 현재 페이지 번호
  const [pgNum, setPgNum] = useState(1);

  // 2. 데이터 변경변수 : 리스트에 표시되는 실제 데이터셋
  const [currData, setCurrData] = useState(null);

  // 3. 게시판 모드관리변수 (5가지 상태값 : CRUD+L)
  const [bdMode, setBdMode] = useState("L");
  // 모드구분값 : CRUD (Create/Read/Update/Delete)
  // C - 글쓰기 / R - 글읽기 / U - 글수정 / D - 글삭제(U에포함!)
  // 상태추가 : L - 글목록

  // 4. 버튼공개 여부 관리변수 : 수정버튼
  const [btnSts, setBtnSts] = useState(false);

  // 리랜더링 루프에 빠지지 않도록 랜더링 후 실행구역에
  // 변경코드를 써준다! 단, logSts에 의존성을 설정해 준다!
  // 만약 로그아웃하면 버튼 상태값 false로 변경하기!
  useEffect(() => {
    if (myCon.logSts === null) setBtnSts(false);

    // 만약 글쓰기모드(C)에서 로그아웃시 리스트페이지로이동
    if (myCon.logSts === null && bdMode === "C") setBdMode("L");
  }, [myCon.logSts]);
  // [ 리랜더링의 원인 중 많은 경우 랜더링 전 즉, 가상돔에 설정을 잡을 때 발생한다! ]
  // -> 해결책은 랜더링 후 처리구역에서 변경되는 상태변수를
  // 의존성에 등록하여 그 변경 발생시 한번만 실행되도록 설정하는 것이다!

  /************************************* 
    함수명 : bindList
    기능 : 페이지별 리스트를 생성하여 바인딩함
  *************************************/
  const bindList = () => {
    // ////console.log("다시바인딩!",pgNum);
    // 데이터 선별하기
    const tempData = [];

    // 시작값 : (페이지번호-1)*블록단위수
    // 한계값 : 블록단위수*페이지번호
    // 블록단위가 7일경우 첫페이지는 0~7, 7~14, ...

    // 내림차순 정렬
    orgData.sort((a, b) => {
      return Number(a.idx) === Number(b.idx)
        ? 0
        : Number(a.idx) > Number(b.idx)
        ? -1
        : 1;
    });

    // 시작값
    let initNum = (pgNum - 1) * pgBlock;
    // 한계값
    let limitNum = pgBlock * pgNum;

    //console.log("시작값:", initNum, "\n한계값:", limitNum);

    // 데이터 선별용 for문 : 원본데이터(orgData)로부터 생성
    for (let i = initNum; i < limitNum; i++) {
      // 마지막 페이지 한계수체크
      if (i >= totNum) break;
      // 코드 푸시
      tempData.push(orgData[i]);
    } ///////////// for /////////////

    //console.log("결과셋:", tempData);

    // 데이터가 없는 경우 출력 ///
    if (tempData.length === 0) {
      return (
        <tr>
          <td colSpan="5">There is no data.</td>
        </tr>
      );
    }

    // if 문에 들어가지 않으면 여기를 리턴함 !!
    return tempData.map((v, i) => (
      <tr key={i}>
        {/* 1. 일련번호 */}
        <td>{i + 1 + initNum}</td>
        {/* 2. 글제목 */}
        <td>
          <a href="#" data-idx={v.idx} onClick={chgMode}>
            {v.tit}
          </a>
        </td>
        {/* 3. 글쓴이 */}
        <td>{v.unm}</td>
        {/* 4. 쓴날짜 */}
        <td>{v.date}</td>
        {/* 5. 조회수 */}
        <td>{v.cnt}</td>
      </tr>
    ));
  }; /////////// bindList 함수 ////////////

  /************************************* 
    함수명 : pagingLink
    기능 : 리스트 페이징 링크를 생성한다!
  *************************************/
  const pagingLink = () => {
    // 페이징 블록만들기 ////
    // 1. 블록개수 계산하기
    const blockCnt = Math.floor(totNum / pgBlock);
    // 전체레코드수 / 페이지단위수 (나머지가 있으면 +1)
    // 전체레코드수 : pgBlock변수에 할당됨!
    // 2. 블록 나머지수
    const blockPad = totNum % pgBlock;

    // 최종 한계수 -> 여분레코드 존재에 따라 1더하기
    const limit = blockCnt + (blockPad === 0 ? 0 : 1);

    // console.log(
    //   "블록개수:",
    //   blockCnt,
    //   "\n블록나머지:",
    //   blockPad,
    //   "\n최종한계수:",
    //   limit
    // );

    // 리액트에서는 jsx문법 코드를 배열에 넣고
    // 출력하면 바로 코드로 변환된다!!
    let pgCode = [];
    // 리턴 코드 //////////
    // 만약 빈태그 묶음에 key를 심어야 할 경우
    // 빈태그에는 불가하므로 Fragment 조각 가상태그를 쓰고 쓰면 된다!
    for (let i = 0; i < limit; i++) {
      pgCode[i] = (
        <Fragment key={i}>
          {pgNum - 1 === i ? (
            <b>{i + 1}</b>
          ) : (
            <a href="#" onClick={chgList}>
              {i + 1}
            </a>
          )}

          {i < limit - 1 ? " | " : ""}
        </Fragment>
      );
    } /////// for ///////

    return pgCode;
  }; /////////// pagingLink 함수 ////////

  /************************************* 
    함수명 : chgList
    기능 : 페이지 링크 클릭시 리스트 변경
  *************************************/
  const chgList = (e) => {
    let currNum = e.target.innerText;
    //console.log("번호:", currNum);
    // 현재 페이지번호 업데이트 -> 리스트 업데이트됨!
    setPgNum(currNum);

    // 바인드 리스트 호출!
    // -> 불필요!!! 왜? pgNum을 bindList에서 사용하고 있기 때문에
    // 리랜더링이 자동으로 일어남!!
    // bindList();
  }; /////////// chgList ///////////////

  // 선택된 데이터 셋팅을 위한 참조변수
  const cData = useRef(null);

  // 로그인 사용자 데이터 셋팅을 위한 참조변수
  const logData = useRef(null);
  /************************************* 
    함수명 : chgMode
    기능 : 게시판 옵션 모드를 변경함
  *************************************/
  const chgMode = useCallback((e) => {
    // 기본이동 막기
    e.preventDefault();
    // 1. 해당 버튼의 텍스트 읽어오기
    let btxt = $(e.target).text();

    // 2. 텍스트별 모드 연결하기
    let modeTxt;

    switch (btxt) {
      case "List":
        modeTxt = "L";
        break;
      case "Write":
        modeTxt = "C";
        break;
      case "Modify":
        modeTxt = "U";
        break;
      case "Submit":
        modeTxt = "S";
        break;
      case "Delete":
        modeTxt = "D";
        break;
      default:
        modeTxt = "R";
    }

    // 3. 모드 이동하기
    // -> Submit은 모드변경없이 새글쓰기/글변경하기
    // 둘 중 하나의 기능을 하므로 리스트로 보내기만 한다!
    // if(modeTxt!=="X") setBdMode(modeTxt);

    // 3. 모드별 분기하기 //////
    // 3-1. 읽기 모드
    if (modeTxt === "R") {
      setBdMode("R");
      // 1. a링크의 'data-idx'값 읽어오기
      let cidx = $(e.target).attr("data-idx");
      console.log("읽기처리", cidx);

      // 2. 해당정보 가져오기 : orgData에서 조회함
      // 전역 참조변수에 저장하여 리랜더링시 리턴코드에
      // 이 값이 적용되게 해준다!!!
      cData.current = orgData.find((v) => {
        if (v.idx === cidx) return true;
        if (Number(v.idx) === Number(cidx)) {
          console.log("내순번:", v.idx);
          return true;
        }
      });
      console.log("현재Data:", cData.current);
      // 로그인 사용자와 글쓴이가 같으면 btnSts상태값 true
      // 상태업데이트 함수호출!(uid를 보냄)
      compUsr(cData.current.uid);
      setBdMode("R");
      // -> 아래의 방식은 스크립트로 DOM에 셋팅하는 방법
      // ->> 리액트는 가상돔에 데이터를 셋팅하도록 해야함!
      // cData를 참조변수로 만들어서 미리 데이터를 셋팅했음!

      // 3. 읽기모드 입력창에 데이터 매칭하여 넣기
      // $(() => {
      //   // DOM 그린 후 실행함!
      //   // (1)글쓴이
      //   $(".readone .name").val(cData.writer);
      //   // (1)글제목
      //   $(".readone .subject").val(cData.tit);
      //   // (1)글내용
      //   $(".readone .content").val(cData.cont);
      // });
    } ////// if ///////
    // 3-2.리스트 이동하기
    else if (modeTxt === "L") {
      setBdMode("L");
    }
    // 3-3.쓰기 모드
    else if (modeTxt === "C") {
      // 로그인한 사용자 정보 셋팅하기
      // ->글쓰기버튼은 로그인한 사람에게만 노출되어서 아래코드는 괜찮음
      logData.current = JSON.parse(myCon.logSts);
      // 이 데이터로 가상돔 구성시 리액트코드에 데이터 매칭함!
      // 필요데이터 : 로그인 사용자 이름(unm), 이메일(eml)

      setBdMode("C");

      // 1. 글쓴이와 이메일은 로그인 상태값에서 읽어와서
      // 본 읽기 전용 입력창에 넣어준다!
      // 지금은 임시로 tomtom / tom@gmail.com
      $(() => {
        // // DOM 그려진 후 실행함
        // // (1) 글쓴이
        // $(".writeone .name").val("tomtom");
        // // (2) 이메일
        // $(".writeone .email").val("tom@gmail.com");
      });
    }

    // 3-4. 글쓰기 서브밋
    else if (modeTxt === "S" && bdMode === "C") {
      console.log("글쓰기 서브밋");

      // 제목/내용 입력요소
      const subEle = $(".writeone .subject");
      const contEle = $(".writeone .content");

      // 1. 제목, 내용 필수입력 체크
      // 리랜더링 없는 DOM상태 기능구현 !!
      if (subEle.val().trim() === "" || contEle.val().trim() === "") {
        window.alert("제목과 내용은 필수입력입니다!");
      } ///// if /////////

      // 2. 통과시 실제 데이터 입력하기
      else {
        const addZero = (x) => (x < 10 ? "0" + x : x);
        // 1. 날짜데이터 구성
        let today = new Date();
        let yy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        // 2. 원본 데이터 변수할당
        let orgTemp = orgData;

        // 3. 입력idx 기본키값을 숫자값 중 최대값에 1을 더함!!
        // 3-1. idx값만 모아서 배열로 재구성 하기(숫자형 변환!)
        let arrIdx = orgTemp.map((v) => parseInt(v.idx));
        // 최대값
        let maxNum = Math.max(...arrIdx);
        console.log("idx배열:", arrIdx);
        console.log("최대값:", maxNum);
        console.log("다른방법최대값:", Math.max.apply(null, arrIdx));
        // 스프레드 연산자 나오기 전에는 항상 apply메서드 사용함
        // apply(this객체, 배열값) ->this 객체전달 없으므로 null씀
        // 배열값 내부의 값을 하나씩 전달하기

        // Math.max()에서 값을 비교하기 위해 배열값을
        // 나열하여 입력하면 된다!
        // 배열값을 나열하는 연산자는? Spread Operator
        // (스프레드 연산자 : ...)
        // 다른배열을 합칠때도 사용한다
        // let aa = [1,15];
        // let bb = [3000,5000];
        // let cc = [...aa,...bb];
        // console.log('합친배열:',cc)

        // let test = Math.max(1,2,3,4,5);
        // console.log('1-5사이최대값:',test)
        // 4. 임시변수에 입력할 객체 데이터 생성하기
        let temp = {
          idx: maxNum + 1,
          tit: subEle.val().trim(),
          cont: contEle.val().trim(),
          att: "",
          date: `${yy}-${addZero(mm)}-${addZero(dd)}`,
          uid: logData.current.uid,
          unm: logData.current.unm,
          cnt: "0",
        };
        // console.log('입력전 준비데이터:',temp)

        // 5. 원본임시변수 배열데이터 값 push하기
        orgTemp.push(temp);
        // console.log('최종반영 전체데이터:',orgTemp);

        // 6. 로컬스에 반영하기
        localStorage.setItem("bdata", JSON.stringify(orgTemp));

        // 7. 리스트 페이지로 이동하기
        setBdMode("L");
      } /////// else ///////
    }
    // 3-4. 수정모드
    else if (modeTxt === "U") {
      console.log("수정모드");
      setBdMode("U");
    }
    // 3-6. 수정하기 서브밋 ////
    else if (modeTxt === "S" && bdMode === "U") {
      // 제목/내용 입력요소
      const subEle = $(".updateone .subject");
      const contEle = $(".updateone .content");

      // 1. 제목, 내용 필수입력 체크
      // 리랜더링 없는 DOM상태 기능구현 !!
      if (subEle.val().trim() === "" || contEle.val().trim() === "") {
        window.alert("제목과 내용은 필수입력입니다!");
      } ///// if /////////

      // 2. 통과시 실제 데이터 입력하기
      else {
        // 2. 원본 데이터 변수할당
        let orgTemp = orgData;

        // 3. 원본에 해당 데이터 찾아서 업데이트하기
        //some() 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트합니다. 만약 배열에서 주어진 함수가 true을 반환하면 true를 반환합니다. 그렇지 않으면 false를 반환합니다. 이 메서드는 배열을 변경하지 않습니다.
        orgTemp.some((v) => {
          if (cData.current.idx === Number(v.idx)) {
            // 제목과 내용 업데이트
            v.tit = subEle.val().trim();
            v.cont = contEle.val().trim();

            // 이 코드를 만나면 여기서 순회종료!
            return true;
          }
        });

        // 4. 로컬스에 반영하기
        localStorage.setItem("bdata", JSON.stringify(orgTemp));

        // 5. 리스트 페이지로 이동하기
        setBdMode("L");
      } /////// else ///////
    }

    // 3-7. 삭제하기 ///////
    else if (modeTxt === "D" && bdMode === "U") {
      if (window.confirm("정말로 글을 삭제하시겠습니까?")) {
        // 데이터 순회하다가 해당데이터 이면
        // 순번으로 splice(순번,1)사용 삭제
        // 3. 원본에 해당 데이터 찾아서 업데이트하기
        orgData.some((v, i) => {
          if (Number(cData.current.idx) === Number(v.idx)) {
            // 해당 데이터의 순번으로 삭제
            orgData.splice(i, 1);

            // 이 코드를 만나면 여기서 순회종료!
            return true;
          } ////// if ///////
        }); ////////// Array some ////////////

        // 4. 로컬스에 반영하기
        localStorage.setItem("bdata", JSON.stringify(orgData));

        // 5. 리스트 페이지로 이동하기
        setBdMode("L");
      } /////// if /////////
    } //////////// else if ////////////
  }); //////// chgMode 함수 ///////////

  // 사용자 비교함수 ////////////////////
  const compUsr = (usr) => {
    // usr - 글쓴이 아이디(uid)
    // opt는 리턴받을 데이터 종류
    // urm - 사용자 이름, eml - 사용자 이메일

    // 사용자 정보조회 로컬스(mem-info)
    // 보드 상단에서 null일경우 생성함수 이미 호출
    // null은 고려하지 말고 코드 작성

    // 로그인 상태일 경우 조회하여
    // 버튼 상태 업데이트 하기
    if (myCon.logSts !== null) {
      // 1. 로컬스 원본데이터 조회
      const info = JSON.parse(localStorage.getItem("mem-data"));
      console.log(info);

      // 2. 원본으로 부터 해당 사용자 정보 조회 하여
      // 글쓴이와 로그인 사용자가 같으면 btnSts값을 true로 업데이트
      const cUser = info.find((v) => {
        if (v.uid === usr) return true;
      });
      console.log(cUser);

      // 3. 로그인사용자 정보와 조회하기
      // 아이디로 조회함!
      if(cUser){
        // 할당안되면 undefined이므로 할당되었을때만 if문 처리
        const currUsr = JSON.parse(myCon.logSts);
        if (currUsr.uid === cUser.uid) setBtnSts(true);
        else setBtnSts(false);
      }////// if ////////
      else{
        // 사용자 비교값이 없는 경우
        setBtnSts(false);
      } /////// else ////////
    } ////////// if ///////////
    else {
      // 로그인 안한 상태

      setBtnSts(false);
    } /////// else /////////
  }; ////////////// compUsr /////////////

  // 리턴코드 //////////////////////////
  return (
    <>
      {
        /* 1. 게시판 리스트 : 게시판 모드 'L' 일때 출력 */
        bdMode === "L" && (
          <table className="dtbl" id="board">
            <caption>OPINION</caption>
            {/* 상단 컬럼명 표시영역 */}
            <thead>
              <tr>
                <th>Number</th>
                <th>Title</th>
                <th>Writer</th>
                <th>Date</th>
                <th>Hits</th>
              </tr>
            </thead>

            {/* 중앙 레코드 표시부분 */}
            <tbody>{bindList()}</tbody>

            {/* 하단 페이징 표시부분 */}
            <tfoot>
              <tr>
                <td colSpan="5" className="paging">
                  {/* 페이징번호 위치  */}
                  {pagingLink()}
                </td>
              </tr>
            </tfoot>
          </table>
        )
      }
      {
        /* 2. 글쓰기 테이블 : 게시판 모드 'C' 일때 출력 */
        bdMode === "C" && (
          <table className="dtblview writeone">
            <caption>OPINION : Write</caption>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    className="name"
                    size="20"
                    readOnly
                    value={logData.current.unm}
                  />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="text"
                    className="email"
                    size="40"
                    readOnly
                    value={logData.current.eml}
                  />
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  <input type="text" className="subject" size="60" />
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>
                  <textarea className="content" cols="60" rows="10"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      {
        /* 3. 읽기 테이블 : 게시판 모드 'R' 일때 출력 */
        bdMode === "R" && (
          <table className="dtblview readone">
            <caption>OPINION : Read</caption>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    className="name"
                    size="20"
                    readOnly
                    defaultValue={cData.current.unm}
                  />
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  <input
                    type="text"
                    className="subject"
                    size="60"
                    readOnly
                    defaultValue={cData.current.tit}
                  />
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>
                  <textarea
                    className="content"
                    cols="60"
                    rows="10"
                    readOnly
                    defaultValue={cData.current.cont}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        )
      }
      {
        /* 4. 수정(삭제) 테이블 : 게시판 모드 'U' 일때 출력 */
        bdMode === "U" && (
          <table className="dtblview updateone">
            <caption>OPINION : Modify</caption>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    className="name"
                    size="20"
                    readOnly
                    defaultValue={cData.current.unm}
                  />
                </td>
              </tr>
              <tr>
                <td>Title</td>
                <td>
                  {/* defaultValue로 써야 수정가능 ! */}
                  <input
                    type="text"
                    className="subject"
                    size="60"
                    defaultValue={cData.current.tit}
                  />
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>
                  <textarea
                    className="content"
                    cols="60"
                    rows="10"
                    defaultValue={cData.current.cont}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        )
      }

      <br />
      {/* 5. 버튼 그룹박스 */}
      <table className="dtbl btngrp">
        <tbody>
          <tr>
            <td>
              {
                // 리스트 모드 (L)
                bdMode === "L" && myCon.logSts !== null && (
                  <button onClick={chgMode}>
                    <a href="#">Write</a>
                  </button>
                )
              }
              {
                // 글쓰기 모드 (C)
                bdMode === "C" && (
                  <>
                    <button onClick={chgMode}>
                      <a href="#">Submit</a>
                    </button>
                    <button onClick={chgMode}>
                      <a href="#">List</a>
                    </button>
                  </>
                )
              }
              {
                // 읽기 모드 (R)
                bdMode === "R" && (
                  <>
                    <button onClick={chgMode}>
                      <a href="#">List</a>
                    </button>
                    {
                      /* btnSts 상태변수가 true일때 보임
                      -> 글쓴이 = 로그인 사용자 일때 업데이트!!(true변경) */
                      btnSts && (
                        <button onClick={chgMode}>
                          <a href="#">Modify</a>
                        </button>
                      )
                    }
                  </>
                )
              }
              {
                // 수정(삭제) 모드 (U)
                bdMode === "U" && (
                  <>
                    <button onClick={chgMode}>
                      <a href="#">Submit</a>
                    </button>
                    <button onClick={chgMode}>
                      <a href="#">Delete</a>
                    </button>
                    <button onClick={chgMode}>
                      <a href="#">List</a>
                    </button>
                  </>
                )
              }
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
} ///////////// Board 컴포넌트 /////////////////
