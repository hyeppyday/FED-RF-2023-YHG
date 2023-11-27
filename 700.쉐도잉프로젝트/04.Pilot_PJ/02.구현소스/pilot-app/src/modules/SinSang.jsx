// 신상품 컴포넌트 ////////

export function Sinsang(props) {
  //props.cat - 카테고리 분류명

  // 리턴코드 ////////////////////

  const makeList = () => {
    let temp = [];
    for (let x = 0; x < 9; x++) {
      temp[x] = (
        <li className={"m" + (x + 1)} key={x}>
          <a href="#">
            <img
              src={"./images/goods/" + props.cat + "/m" + (x + 1) + ".png"}
              alt="신상품"
            />
          </a>
        </li>
      );
    } ///////////////// for /////////////////////
    return temp;
  }; ///////////// makeList //////////////////

  return (
    <>
      <h2 className="c1tit ">
        NEW MEN'S ARRIVAL
        <button onclick="location.href='glist.html'">전체리스트</button>
      </h2>
      <div className="flowbx ">
        <ul className="flist">
            {makeList()}
        </ul>
      </div>
    </>
  );
} //////////////// Sinsang 컴포넌트 /////////////////
