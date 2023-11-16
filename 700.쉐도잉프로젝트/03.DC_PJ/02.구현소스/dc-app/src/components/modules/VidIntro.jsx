// DC PJ 비디오소개 컴포넌트

// 비디오 소개 데이터 가져오기
import { vidIntroData } from "../data/vidintro";

// 비디오 소개 CSS 불러오기
import "../../css/vidintro.css";

/*
 (1) 구조정의 :
Root > section.vidbox > div
> video box(>video+img) 
+ title box(>heading+p tag) 
*/

export function VidIntro(props) {
  // props.cat - 페이지 분류명
  // props.cls - 디자인적용 클래스('on')

  // 선택데이터 : 페이지 분류명으로 선택
  const selData = vidIntroData[props.cat];

  // 링크생성 함수 : desc 데이터 / sum 데이터에서 처리
  const linkCode = (data) => {
    return (
      <>
        {data.split("*")[0]}
        <a href={selData.link[1]} target="_blank">
          {selData.link[0]}
        </a>
        {data.split("*")[1]}
      </>
    );
  }; ////////////// linkCode /////////////////

  return (
    /* props.cls로 전달되는 값이 'on'/'off'임  */
    <section className={"vidbox" + " " + props.cls}>
      <div>
        {/* 1. 비디오파트 */}
        <div className="vb1">
          <iframe src={selData.vsrc} title={selData.btit}></iframe>
        </div>
        {/* 2. 타이틀/설명파트 */}
        <div className="vb2">
          {/* 작은타이틀 */}
          <h3>{selData.stit}</h3>
          {/* 큰 타이틀 */}
          <h2>{selData.btit}</h2>
          {/* 요약소개 :sum*/}
          <p>
            {/* 특수문자(*)여부에따라 처리하기
                indexOf(문자열) -> 없으면 -1 리턴! */}
            {selData.sum.indexOf("*") == -1
              ? selData.sum
              : linkCode(selData.sum)}
          </p>
          {/* 설명(관련링크) :desc*/}
          <p>
            {/* 특수문자(*)여부에따라 처리하기
                indexOf(문자열) -> 없으면 -1 리턴! */}
            {selData.desc.indexOf("*") == -1
              ? selData.desc
              : linkCode(selData.desc)}
          </p>
        </div>
      </div>
    </section>
  );
} //////////////////// VidIntro 컴포넌트 /////////////////////
