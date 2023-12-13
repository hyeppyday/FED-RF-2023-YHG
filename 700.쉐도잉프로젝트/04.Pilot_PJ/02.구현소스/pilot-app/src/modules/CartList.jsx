// Pilot PJ 장바구니 리스트 컴포넌트

// 장바구니 리스트 CSS 불러오기
import { useEffect, memo, useState } from "react";

import "../css/cartlist.css";

// 제이쿼리
import $ from "jquery";

// 전달값이 변경되면 리랜더링하기 위해 메모이제이션을 적용!
export const CartList = memo(({ selData,flag }) => {
  // selData - 현재 반영된 데이터
  // flag - 상태값 체크변수(true/false) -> 업데이트 여부 결정!

  console.log('업뎃상태값:',flag.current);

  // 상태관리변수 설정 //////////////
  // 1. 변경 데이터 변수 : 전달된 데이터로 초기셋팅!!
  const [cartData, setCartData] = useState(selData);
  
  console.log('받은데이터:',selData,'\n기존데이터:',cartData)
  
  // 카트 컴포넌트의 데이터가 상태관리되고 있으므로
  // 외부에서 전달되는 데이터와 다를때 업데이트 해야
  // 외부에서 들어오는 데이터가 반영되어 리랜더링 된다!
  // 삭제버튼도 작동하게 하려면??? -> 상태변수로 제어한다!!
  // 외부데이터 업데이트는 flag.current값이 true까지 되어야한다!!!
  if(cartData!==selData&&flag.current) setCartData(selData);
  

  // 선택 데이터 : 로컬스토리지 데이터를 객체변환!
  // const selData = JSON.parse(localStorage.getItem("cart"));

  // 데이터개수
  const cntData = cartData.length;

  // console.log(cartData, cntData + "개");

  // 전체합계 구하기
  let totalCnt = 0;
  cartData.forEach((v) => {
    totalCnt += v.ginfo[3] * v.num;
  }); ////////// forEach //////////

  // console.log("토탈:", totalCnt);

  //정규식함수(숫자 세자리마다 콤마해주는 기능)
  function addComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 랜더링 후 실행구역 ///////////////
  useEffect(() => {
    // 카트버튼 나타나기
    $("#mycart").fadeIn(300, function () {
      // 페이드 애니 후
      $(this).addClass("on");
    }); ////////// fadeIn //////////

    // console.log("나야나~");
  }, []); ////////////// useEffect //////////////////

  // 리스트 보이기 함수
  const showList = () => {
    // console.log("열려라!", showList);
    $("#cartlist").animate({ right: "0" }, 600);
  }; /////// showList ////////////

  // 리스트 숨기기 함수
  const hideList = (e) => {
    e.preventDefault();
    $("#cartlist").animate({ right: "-60%" }, 600);
  }; /////// hideList ////////////

  // 리스트 삭제 함수 ///////////////
  const deleteItem = (e) => {
    // 삭제 기능만 작동하게 하기 위해 부모의 useRef값인 flag값을
    // false로 변경하면 상단의 조건업데이트 값이 작동하지 않는다!
    // 삭제기능만 작동함!!
    flag.current = false;

    const selIdx = $(e.target).attr("data-idx");
    console.log("지울아이:", selIdx);

    // 해당 데이터 순번 알아내기
    const newData = cartData.filter((v) => {
      if (v.idx !== selIdx) return true;
    });

    console.log("제거후리스트:", newData);

    // 로컬스 데이터 업데이트!
    localStorage.setItem('cart',JSON.stringify(newData));

    // 전체 데이터 업데이트 하면 모두 리랜더링되게 하자!
    // useState를 사용하는 곳은 모두 리랜더링 되는 리액트!!
    // 컴포넌트 함수 내부에 useState를 만들면 자체적으로 리랜더링 된다
    setCartData(newData);

  }; ////////// deleteItem ////////////

  // 리턴 코드 ////////////////////////
  return (
    <>
      <section id="cartlist">
        <a href="#" className="cbtn cbtn2" onClick={hideList}>
          <span>닫기버튼</span>
        </a>
        <table>
          <caption>
            <h1> 카트 리스트</h1>
          </caption>
          <tbody>
            <tr>
              <th>상품</th>
              <th>번호</th>
              <th>상품명</th>
              <th>상품코드</th>
              <th>단가</th>
              <th>수량</th>
              <th>합계</th>
              <th>삭제</th>
            </tr>

            {cartData.map((v, i) => (
              <tr key={i}>
                {/* 상품이미지 */}
                <td>
                  <img
                    src={"images/goods/" + v.cat + "/" + v.ginfo[0] + ".png"}
                    alt="item"
                  />
                </td>
                {/* 리스트순번 */}
                <td>{i + 1}</td>
                {/* 상품명 */}
                <td>{v.ginfo[1]}</td>
                {/* 상품코드 */}
                <td>{v.ginfo[2]}</td>
                {/* 상품가격 */}
                <td>{addComma(v.ginfo[3])}원</td>
                {/* 상품수량 */}
                <td>{v.num}</td>
                {/* 상품가격 총합계 */}
                <td>{addComma(v.ginfo[3] * v.num)}원</td>
                {/* 삭제버튼 */}
                <td>
                  <button className="cfn" data-idx={v.idx} onClick={deleteItem}>
                    ×
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan="6">총합계 :</td>
              <td>{addComma(totalCnt)}원</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* 카트버튼이미지 박스 */}
      <div id="mycart" onClick={showList}>
        {/* 이미지 */}
        <img src="./images/mycart.gif" title="개의 상품이 있습니다." />
        {/* 카트 상품 개수 */}
        <div className="cntBx">{cntData}</div>
      </div>
    </>
  );
}); ////////////// CartList 컴포넌트 /////////
