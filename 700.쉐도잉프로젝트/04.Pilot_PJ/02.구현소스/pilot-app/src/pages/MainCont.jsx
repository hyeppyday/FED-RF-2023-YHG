import { Banner } from "../modules/banner";

// 메인페이지 컨텐츠 컴포넌트
export function MainCont() {
  return (
    <>
        {/* 1. 배너페이지 */}
      <section className="page" 
      style={{ background: "lightblue" }}>
        <Banner/>
      </section>
      <section className="page" 
      style={{ background: "lightpink" }}>
      </section>
      <section className="page" 
      style={{ background: "chocolate" }}>
      </section>
      <section className="page" 
      style={{ background: "lightgreen" }}>
      </section>
      <section className="page" 
      style={{ background: "lightcoral" }}>
      </section>
    </>
  );
} /////////////// MainCont 컴포넌트 /////////////////
