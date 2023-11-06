// 보그 PJ 카페고리 페이지 JS - category.js



// 상단영역 컴포넌트 불러오기
import TopArea from "./components/top_area.jsx";

// 메인영역 컴포넌트 불러오기
import MainCategory from "./components/main_area.jsx";

// 하단영역 컴포넌트 불러오기
import FooterArea from "./components/footer_area.jsx";

////////////////// 메인 컴포넌트 /////////////////////
/*********************************************** 
    컴포넌트명 : MainComponent
    기능 : 상단, 메인, 하단영역 종합 출력
***********************************************/
function MainComponent() {

  // 우선 URL로 넘어온 키값을 가져옴!
  // 파라미터 전달값 받기 : 파라미터 JS전담객체는?
  // -> URLSearchParams(전체URL)
  const params = new URLSearchParams(location.search);

  // 파라미터중 특정키 받기 : get(키이름) -> 키이름은 'cat'
  const catName = decodeURIComponent(params.get("cat"));
  // 'time & gem' 때문에 decodeURIComponent로 변환해야함
  // -> 보내는 곳에서는 encodeURIComponent으로 처리해야함!

  // 만약 처음들어오는 경우 파라미터가 null이면
  // 다른 페이지 메뉴를 클릭하여 들어온 경우가 아니므로
  // 첫페이지로 리로드시킨다!
//   if(!catName) location.href = 'index.html';

  console.log(
    "URL:",
    location.search,
    "\n파라미터",
    params,
    "\n키값:",
    catName
  );

  // 카테고리 데이터 상태관리 변수 만들기
  const [nowCat, setNowCat] = React.useState(catName);

  // 카테고리 데이터 상태관리변수 업데이트 함수
  const chgCat = (val) =>{
    console.log('바꿔!',val)
    // 상태관리 변수 nowCat업데이트
    setNowCat(val);
  } /////////////// chgCat /////////////////

  return(
    <React.Fragment>
      {/* 1. 상단영역 */}
      <TopArea chgItem ={chgCat}/>
      {/* 2. 메인영역 */}
      <MainCategory category={nowCat} />
      {/* 3. 하단영역 */}
      <FooterArea/>

    </React.Fragment>
  )

} ////////////////// MainComponents /////////////////////

// 메인 컴포넌트 출력하기 /////////
ReactDOM.render(<MainComponent/>,document.querySelector('#root'));

