// 06. Event : 리액트 이벤트

/************************************************************* 
    [ 리액트 이벤트 ]
    1. 일반 HTML DOM 이벤트와 마찬가지로 사용자이벤트 사용가능함
    2. 이벤트 종류: click, change, mouseover 등 일반이벤트
    3. 이벤트 표기법: 캐믈케이스 - 첫글자소문자 단어마다 대문자
    예) onclick -> onClick
    4. 이벤트 핸들러 : 중괄호 안에 작성(중괄호는 JSX표현식영역)
    예) onclick="getIt()" => onClick={getIt}
*************************************************************/

/////////////// 전체 이벤트 적용할 컴포넌트 구성하기 /////////////////
function EventShow(){

    // 1. 컴포넌트에서 사용하는 내부용 함수 작성
    // (1) 소원이 무엇이냐 실행함수
    const aladin = lamp => { // lamp - 알라딘 주인공 이미지경로
        console.log('알라딘함수:',lamp);
         // (1-1) #tbox인 요소의 내부에 h1 요소 넣기
        document.querySelector('#tbox').innerHTML +=
        `<h1 class="tit">🧞‍♂️ 소원이 무엇이냐? 🧞‍♂️</h1>`;

        // (1-2) 소원이 무엇이냐 타이틀 박스 CSS구성하기
        let tit = document.querySelector('.tit');
        tit.style.cssText = `
        width: 50%;
        padding: 50px 0;
        margin: 0 auto;
        border: 2px solid lime;
        transition: all 2s 1s;
        opacity: 0;
        `;

        // (1-3) 0.5 초후 CSS변경으로 타이틀 등장하기
        setTimeout(()=>{
            tit.style.cssText =
           ` width: 50%;
            padding: 50px 0;
            margin: 0 auto;
            border: 2px solid lime;
            transition: all 2s 1s;
            opacity: 1;

            border-radius: 50%;
            transform: translateY(-200px);
            font-size: 40px;
            color: white;
            background-color: rgba(0,0,0,.5);`;
        },500); ////////////// 타임아웃 //////////////

        // (1-4) 램프 가져오기 버튼 3초후 보이기
        setTimeout(()=>{
            document.querySelectorAll('button')[0]
            .style.display = 'inline-block';
        },3000);

        // (1-5) #ala 요소의 이미지 보이기
        // ReactDOM.render(어쩌구,저쩌구)
        ReactDOM.render(<MakeImg isrc={lamp} ialt="알라딘"/>,document.querySelector('#ala'));

    }; /////////// aladin 함수 ///////////////

    // (2) 램프 가져오기 함수 /////////////////////
    const getLamp = () => {

        // 1. 램프 선택 : 컴포넌트 구성요소에 넣음
        let lamp = document.querySelector('.lamp');

        // 2. 램프에 이미지 넣기
        ReactDOM.render( <MakeImg isrc="https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/3168457870/B.png" ialt="알라딘 램프" info="false"/>,lamp);

         // 3. 램프 이미지 초기셋팅
        let lampImg = lamp.querySelector('img');
        lampImg.style.cssText = `
        position: absolute;
        top: 0;
        right: 0;
        width: 200px;
        border-radius: 50%;
        transition: 2s;
        `;

        // 4. 0.5초후 램프 이미지 중앙 이동하기
        setTimeout(()=>{
            lampImg.style.cssText = `
        position: absolute;
        top: 400px;
        right: calc(50% - 100px);
        width: 200px;
        border-radius: 50%;
        transform : rotate(720deg);
        transition: 2s, right 1s 2s;
        `;
        },500);

        // 5. 소원빌기 버튼 3초후 보이기
        setTimeout(() => {
            document.querySelectorAll('button')[1]
            .style.display = "inline-block";
        },3000);

        }; /////////////// getLamp함수 ////////////////

       

    // (3) 페라리 가져오기 함수 /////////////////////
    const getFerrari = () => {
        console.log('페라리 줄께~!');
        // 페라리 이미지 넣기
        // 대상: #ferrari
        ReactDOM.render(<MakeImg isrc="https://www.pngplay.com/wp-content/uploads/13/Ferrari-458-Transparent-PNG.png" ialt="페라리레드" info="true" idnm="car" tit="클릭하면 시운전해요!" />,
        document.querySelector('#ferrari'));

    }; ///////////// getFerrari함수 ///////////////////

    // 2. 컴포넌트 리턴은 가장 아래쪽에서 함 
    return(
        <React.Fragment>
            <div id="tbox" style={{textAlign:"center"}}>
                {/* 소원을 말해봐 이미지 출력 : onmouseover 이벤트 적용 */}
                <img src="./images/aladin.jpg" alt="지니" 
                onMouseOver={()=>{aladin('./images/ala4.jpg')}}
                />
            </div>
            {/* 램프가 들어갈 요소 */}
            <div className="lamp"></div>
            {/* 버튼들 */}
            <button onClick={getLamp}>램프 가져오기</button><br/>
            <button onClick={getFerrari}>
                소원빌기!🙏 페라리 주세요~!🚗
            </button>
        </React.Fragment>
    );

} ///////////// EventShow ///////////////

// 이미지 생성 컴포넌트 ////////////////////////////
function MakeImg (props){ // isrc - 이미지 경로 / ialt - 이미지 설명
    // 비?집:놀이동산
    // 페라리와 구분하여 이미지를 별도로 구성하여 리턴함
    // props.info -> true/false값을 보내서 처리함!
    // true이면 페라리용 이미지태그로 생성함!
    console.log('구분속성 props.info:',props.info);

    return( 
        props.info?
        <img 
        id={props.idnm}
        src={props.isrc} 
        alt={props.ialt} 
        title={props.tit}
        onClick={moveCar}
        />:
        <img src={props.isrc} alt={props.ialt} />
    );
} /////////// MakeImg 컴포넌트 ///////////////////////

// 일반함수로 페라리 움직이기 구현!!!
let actOne=1;
function moveCar (){
    console.log('움직여!페라리!');
    let car = document.querySelector('#car');
    car.style.transform = actOne?"translateX(150%) scale(2)":"translateX(0) scale(1)";
    car.style.transition = "2s ease-in-out";

    actOne?actOne=0:actOne=1;

} /////////// moveCar //////////////

// 최초 컴포넌트 출력하기 ///////////////
ReactDOM.render(<EventShow/>,document.querySelector('#root'));
// ReactDOM.render(어쩌구,저쩌구)
// 어쩌구를 저쩌구에 출력!