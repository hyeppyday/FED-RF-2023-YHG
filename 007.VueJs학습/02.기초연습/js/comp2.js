/* 01.컴포넌트 연습1 JS */

// 뷰JS 인스턴스 생성용 함수 : x 는 대상요소
const makeVue = (x) => new Vue({ el: x });

// 1. 제목에 넣을 전역 컴포넌트 만들기
// Vue.component(캐밥케이스 컴포넌트태그명,{옵션})
// 이렇게 생성함
Vue.component("tit-comp", {
  template: `
        <strong>
            <span>
               📫 Vue Js 컴포넌트 : 
            </span>
            Shopping Mall Gallary List
        </strong>
    `,
}); ///////// 전역 컴포넌트1 //////////

// 컴포넌트를 먼저 만들고 나서 뷰 인스턴스를 생성함!

// 뷰 인스턴스 생성하기
makeVue(".tit");

// 이미지번호 숫자증감 변수
let inum = 0;
// 상품명 배열
const goods = ["프레이컷", "아일렛기모", "베어부클", "포멀믹스톤"];

// 2. 갤러리 리스트에 넣을 전역컴포넌트 만들기
// ->>>> 자식 컴포넌트 !!!!!!!!!! (부모는? new Vue ~~)
Vue.component("list-comp", {
  // 2-1. template 옵션 : 태그구성
  // src 속성을 셋팅된 변수를 적용하기 위해
  // 속성앞에 v-bind:을 붙여서 v-bind:src 로 쓰면
  // 값으로 문자형을 써도 그 안의 값은 변수가 된다 !!!!!!!
  template: `
    <div>
        <img 
        v-bind:src="gsrc"
        v-on:click="goPapa('나는 자식이다!')"
        
        alt="dress"> 
        <aside>
            <h2 v-text="gname" v-on:mouseover="goMama({이름:'김고은',나이:'34살'})"></h2> 
            <h3 
            v-text="gprice"
            v-on:click="goPapa('나는 가격이다!')"
            ></h3>
        </aside>
    </div>
`,
  // 2-2. props 옵션
  // 부모 인스턴스 요소에서 v-bind:속성명=값
  // 으로 전달한 속성변수를 받는 옵션
  // 사용법 ->>> props:[] or {} 로 받음
  // [] 배열로 받으면 변수만 쓰고
  // {} 객체로 받으면 변수를 속성에, 값은 데이터형을 쓴다
  props: ["data-num", "my-seq", "end-let"],
  // props:{'data-num':Number},   -> 데이터형 일치
  // props:{'data-num':String},  -> 데이터형 불일치로 에러발생

  // props로 셋팅한 부모전달 속성을 this 키워드와 함께
  // 변수형으로 사용하는 방법은??
  // 'data-num' -> this.dataNum
  // -> 캐믈케이스로 변환하여 사용하면 된다!!

  // 2-3. data 옵션 : 컴포넌트 내부 변수 셋팅
  // 실행원리 : 컴포넌트가 빌드할 때 data 속성의 함수를 호출한다!
  // 그래서 리턴되는 객체값이 컴포넌트 내부에 전달된다!!
  data: function () {
    // 템플릿에서 사용할 변수는 반드시 리턴한다!!
    // 속성 : 값으로 구성된 객체를 리턴한다!!!
    return {
      // 이미지 경로
      gsrc: `images/${this.dataNum}.jpg`,
      // 상품명
      gname: "DE-" + this.setName() + this.endLet,
      // 상품가격
      gprice: this.setPrice(),
    };
  },

  // 2-4. methods 속성 : 컴포넌트 내부 메서드 셋팅
  methods: {
    // 자식 메서드에서 부모 메서드를 호출한다!!
    goPapa(txt) {
      // $emit(부모가만든이벤트명,전달값)
      // 부모가 만든 이벤트명은 hull임!
      // txt - 자식컴포넌트에서 보낸 텍스트 값
      this.$emit("hull",txt);
      // 과정 : 자식이벤트인 'click'이벤트가
      // 부모 컴포넌트에 셋팅된 'hull'라는 이름의 이벤트로 전달됨
      // hull이 click으로 전달되어 클릭이벤트가 설정된다!
    }, // goPapa


    goMama(pm){
        // pm - 전달변수
        // $emit(부모가만든이벤트명,전달값)
        this.$emit('got-kimchi',pm);
    },
    
    setNum() {
      inum += 1;
      // console.log('num:',inum);
      return inum;
    }, // setNum
    setName() {
      // 0 ~ 3 사이난수
      let rdm = Math.floor(Math.random() * 4);
      // 이름 리턴
      return goods[rdm];
    }, // setName
    setPrice() {
      // 다양한 가격을 위한 4~20 사이 난수곱 만들기
      let rdm2 = Math.ceil(Math.random() * 17) + 3;
      // 가격 리턴
      return this.addCommas(rdm2 * 20000) + "원";
    }, // setPrice
    //정규식함수(숫자 세자리마다 콤마해주는 기능)
    addCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  }, // methods
}); //////// 전역 컴포넌트2 ///////////

// 리스트뷰 인스턴스 생성하기
// makeVue(".grid");
// 부모 컴포넌트에서 메서드 설정으로 해야
// 자식 컴포넌트가 호출할 수 있는 메서드가 만들어짐!!!
// ->>>> 부모 컴포넌트 !!!!!! (자식은? Vue.component ~~)
new Vue({
  el: ".grid",
  // 부모 뷰 인스턴스 메서드 구역
  methods: {
    // 자식 이벤트 전달 후 실행 메서드!
    // txt - 자식컴포넌트에서 보낸 텍스트 값
    goMsg(txt) {
      alert("자식이 부모에게 이벤트 전달 성공!"+txt);
    },
    // 자식 컴포넌트의 오버이벤트가 전달되어 호출하는 함수
    overMsg(pm) {
        // pm - 전달변수
      alert("오마이 갓김치!"+pm.이름+pm.나이);
    }, // overMsg
  },
});

// 유튜브 아이프레임 컴포넌트 ////////////
Vue.component("ifr-comp", {
  template: `
    <iframe width="49.6%" style="aspect-ratio: 16/9;" v-bind:src="usrc" title="#고윤정 과 함께 차가운 겨울을 더욱 액티브하게!  l 디스커버리 23FW #goyounjung #크롭패딩" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `,
    props:["data-id"],
  // function 생략 가능함 !!
  data() {
    return {
      usrc: `https://www.youtube.com/embed/${this.dataId}?autoplay=1&mute=1&loop=1&playlist=${this.dataId}`,
    };
  },
});

// 부모 컴포넌트 인스턴스 생성하기
makeVue(".you-box");
