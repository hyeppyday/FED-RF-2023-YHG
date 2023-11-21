// DC PJ 캐릭터 리스트 컴포넌트

import '../../css/catlist.css'
import { SwiperCat } from '../plugin/SwiperCat'

/* 
Root>
    section.cat-swbox >
        h2.tit + <SwiperCat />

        -> 스와이퍼 컴포넌트 구조:
        스와이퍼 리스트 >
            <Link to> >
                section.sw-inbox2 > img
                +
                div.cat-tit2 > h3
*/

export function CatList() {
    return(
        <>
            <section className="cat-swbox">
                {/* 1. 모듈 타이틀 */}
                <h2 className="tit">WHO'S WHO: THE JUSTICE LEAGUE</h2>
                {/* 2. 스와이퍼 컴포넌트 */}
                <SwiperCat/>
            </section>
        </>
    )
} /////////////// CatList 컴포넌트 /////////////////
