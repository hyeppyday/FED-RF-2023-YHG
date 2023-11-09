// 상단영역 컴포넌트
// GNB 데이터
import { menu } from "../data/gnb";
import { Logo } from "../contents/Logo";

export function TopArea(props){
    return(
        <>
        {/* 1. 상단영역 */}
        <header className="top-area">
            {/* 네비게이션 GNB파트 */}
            <nav className="gnb">
                <ul>
                    <li>
                        <Logo/>
                        </li>
                    {
                        
                        menu.map((v,i)=>
                        <li key={i}>
                            <a href="#" 
                            onClick={()=>props.chgFn(
                                v.txt=='Home'?'main':v.txt
                                )}>{v.txt}</a>
                        </li>
                            /* 
                            map()을 사용하여 태그를 생성할때
                            데이터의 유일키를 key속성으로 만들지않으면
                            아래와 같은 에러가 발생함!!
                            (이유: 구별되는 항목으로 나중에 업데이트시 
                            이용할 수 있도록 리액트에서 강제하고 있음)

                            Warning: Each child in a list should have a unique "key" prop.
                            */
                            )
                    }
                </ul>
            </nav>
        </header>
        </>
    )
}