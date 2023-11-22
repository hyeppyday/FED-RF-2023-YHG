// 시리즈페이지 메인컨텐츠

import { Banner } from "../modules/Banner";
import { VidIntro } from "../modules/VidIntro";
import { VidSwipe } from "../modules/VidSwipe";

export function Series(){
    return(
        <>
            {/* 1. 무비페이지 배너 */}
            <Banner category="SERIES"/>
            {/* 2. 비디오 인트로 */}
            <VidIntro cat="MOVIES" cls="on"/>
            {/* 3. 비디오 스와이프 */}
            <VidSwipe cat="movies"/>
        </>
    )
} /////////////// Movies //////////////////