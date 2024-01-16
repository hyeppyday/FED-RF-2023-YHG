// pilot PJ 전체메뉴 컴포넌트

// 컨텍스트 API불러오기
import { useContext } from "react";
import { pCon } from "./PilotContext";

export function TotalMenu() {

  // 컨텍스트 사용
  const myCon = useContext(pCon);
  // pCon에 Provider value 속성에 공개한 변수/함수를 전역적으로 사용가능하게 됨
  // creatContext로 보내서 useContext로 받으면 됨!

  // 메뉴 이동 처리 함수
  const goPage = (txt)=>{
    myCon.chgPgName(txt);
    // 전체박스(mbox)숨기기
    document.querySelector('.ham').click();
  } //////////// goPage 메서드 //////////////


  // 코드리턴 /////////////////////
  return (
    <>
      <div className="mbox">
        <video
          src="images/disc2018.mp4"
          loop="loop"
          muted="muted"
          className="bgm"
        ></video>
        <nav className="mlist">
          <dl>
            <dt>
              <a href="#" onClick={(e)=>{e.preventDefault();goPage('men')}}>MEN</a>
            </dt>
            <dd>
              <a href="#">T-SHIRT</a>
            </dd>
            <dd>
              <a href="#">JACKET</a>
            </dd>
            <dd>
              <a href="#">TRAINING WARE</a>
            </dd>
            <dd>
              <a href="#">BEACH WARE</a>
            </dd>
          </dl>
          <dl>
            <dt>
              <a href="#" onClick={(e)=>{e.preventDefault();goPage('women')}}>WOMEN</a>
            </dt>
            <dd>
              <a href="#">T-SHIRT</a>
            </dd>
            <dd>
              <a href="#">JACKET</a>
            </dd>
            <dd>
              <a href="#">TRAINING WARE</a>
            </dd>
            <dd>
              <a href="#">BEACH WARE</a>
            </dd>
          </dl>
          <dl>
            <dt>
              <a href="#" onClick={(e)=>{e.preventDefault();goPage('style')}}>STYLE</a>
            </dt>
            <dd>
              <a href="#">COLLECTION</a>
            </dd>
            <dd>
              <a href="#">SEASON AD</a>
            </dd>
            <dd>
              <a href="#">STAR &amp; NEWS</a>
            </dd>
            <dd>
              <a href="#">MAIN ITEM</a>
            </dd>
          </dl>
        </nav>
      </div>
    </>
  );
} ////////////// TotalMenu 컴포넌트 ///////////////
