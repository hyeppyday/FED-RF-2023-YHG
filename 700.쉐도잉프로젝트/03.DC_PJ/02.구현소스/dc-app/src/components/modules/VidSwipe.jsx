// DC PJ 비디오스와이프 컴포넌트

import { SwiperVid } from "../plugin/SwiperVid";
import '../../css/vidswipe.css'

/* 
[ 구조정의 ]
Root>
        section.vidswbox>
        (h2.tit+<SwiperVid/>) +
        (section.vidbx >
            div.playvid >
                h2.ifrtit + iframe + button)
*/

export function VidSwipe(props){
    return(
        <>
        {/* 모듈코드 */}
        <section className="vid-swbox">
            {/* 1. 모듈타이틀 */}
            <h2 className="tit">{props.tit}</h2>
            {/* 2. 스와이퍼 컴포넌트 */}
            <SwiperVid />
            {/* 3. 비디오 재생창 */}
            <section className="vid-bx">
                {/* 비디오 중앙박스 */}
                <div className="play-vid">
                    {/* 비디오 타이틀 */}
                    <h2 className="ifr-tit"></h2>
                    {/* 아이프레임 */}
                    <iframe src="" allow="autoplay"></iframe>
                    {/* 닫기버튼  */}
                    <button className="cbtn">×</button>
                </div>
            </section>
        </section>
        
        </>
    );
} //////////// VidSwipe 컴포넌트 //////////////