// DC PJ 캐릭터 검색결과 리스트 컴포넌트

import { Link } from "react-router-dom";
import { catListData } from "../data/swipercat";

// 캐릭터 검색 리스트 CSS 가져오기
import '../../css/search_cat_list.css'


export function SchCatList(props) {
    // props.word - 데이터 검색값
  // 선택데이터
  const selData = catListData.filter(v=>{
    if(v.cname.toLowerCase().indexOf(props.word) !== -1) return true;
  });
  return (
    <>
      <ul className="clist">
        {selData.map((v, i) => (
          <li key={i}>
            <Link
              to="/detail"
              state={{
                cname: v.cname,
                cdesc: v.cdesc,
                facts: v.facts,
              }}
            >
              <img src={v.tmsrc} alt={v.cname} />
              <h3>{v.cname}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
} //////////////// SchCatList ////////////////////
