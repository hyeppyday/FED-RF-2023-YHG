// DC.com 배너 컴포넌트

// 배너데이터
import { banData } from "../data/banner.js";
// 배너 CSS
import '../../css/banner.css';

// 배너 컴포넌트
 export function Banner(props){
    // category - 카테고리 분류명(배너데이터 선택)
// 리스트 만들기 함수
const makeList = (data) =>{
    console.log(data);
    return data.map((v,i)=>(
    <li key={i}>
        <img src={v.src} alt="하하"/>
    </li>))
};

    return(
        <div className="banner">
            {/* 이동슬라이드 */}
            <ul className="slider">
                    {makeList(banData[props.category])}
            </ul>
        </div>
    )
 }/////////// Banner 컴포넌트 ////////////
