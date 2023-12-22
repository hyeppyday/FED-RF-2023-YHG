// 상품 전체 리스트 페이지

// CSS 불러오기
import { useRef, useState } from "react";
import "../css/glist.css";

import $ from 'jquery'

// 상품 데이터 불러오기
import gdata from "../data/glist-items";
import { ItmeDetail } from "../modules/itemDetail";

// console.log(gdata);

export function GList() {

  // 참조변수 셋팅: 리랜더링 없이 값 유지!!
  // 1. 아이템 코드(m1,m2,m3,...)
  const item = useRef("m1");
  // 2. 카테고리명(mem,women,style)
  const catName = useRef("men");
  // 리랜더링을 위한 상태변수 : 무조건 리랜더링 해줌
  const [force,setForce] = useState(null);


  // 리스트 만들기 함수
  const makeList = () =>
    gdata.map((v, i) => (
      <div key={i}>
        <a href="#/detail" onClick={(e) => {e.preventDefault();showDetail(v.ginfo[0], v.cat)}}>
          [{i + 1}]
          <img
            src={"./images/goods/" + v.cat + "/" + v.ginfo[0] + ".png"}
            alt="dress"
          />
          <aside>
            <h2>{v.ginfo[1]}</h2>
            <h3>{addComma(v.ginfo[3])}원</h3>
          </aside>
        </a>
      </div>
    )); //////// makeList ////////

  //정규식함수(숫자 세자리마다 콤마해주는 기능)
  function addComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 상품클릭시 상세보기 보여주는 함수
  const showDetail = (gCode, catCode) => {
    // gCode - 상품코드, catCode - 분류명
    console.log("상세보여!", gCode, catCode);
    
    // 값 업데이트
    item.current = gCode;
    catName.current = catCode;

    // 리랜더링 상태변경
    setForce(Math.random());
    // -> 리랜더링시 변경된 부분만 업데이트 한다!
    // -> itemDetail 컴포넌트 파트가 업데이트 됨! 

    // 대상 보이기
    $('.bgbx').slideDown(600);
  }; /////////// showDetail ////////////

  // 리턴 코드 //////////////////////
  return (
    <main id="cont">
      <h1 className="tit">All Item List</h1>
      <section>
        <div id="optbx">
          <label htmlFor="men">남성</label>
          <input type="checkbox" id="men" defaultChecked />
          <label htmlFor="women">여성</label>
          <input type="checkbox" id="women" defaultChecked />
          <label htmlFor="style">스타일</label>
          <input type="checkbox" id="style" defaultChecked />
        </div>
        <div className="grid">
          {makeList()}
          <div>
            <a href="#/detail" className=""></a>
          </div>
        </div>
      </section>
      {/* 상세보기박스 */}

      <div
        className="bgbx"
        style={{
          position: "fixed",
          top: 0,
          paddingTop: "12vh",
          backdropFilter: "blur(8px)",
          height: "88vh",
          zIndex: 9999,
        }}
      >
        <ItmeDetail goods={item.current} cat={catName.current} />
      </div>
    </main>
  );
} /////////////// GList 컴포넌트 ///////////
