// Pilot PJ 장바구니 리스트 컴포넌트

import "../css/cartlist.css";

export function CartList() {
  return (
    <>
      <section id="cartlist">
        <a href="#" className="cbtn cbtn2">
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

            <tr>
              <td>
                <img src="images/goods/men/m1.png" alt="item" />
              </td>
              <td>1</td>
              <td>[남성]카모전판프린트 PQ 티셔츠</td>
              <td>DMTS7K731-MG</td>
              <td>99,000원</td>
              <td>1</td>
              <td>99,000원</td>
              <td>
                <button className="cfn" data-idx="1">
                  ×
                </button>
              </td>
            </tr>

            <tr>
              <td colspan="6">총합계 :</td>
              <td>99,000원</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
} ////////// CartList 컴포넌트 ///////////
