// 쇼핑몰 갤러리 JS - small.js

// 템플릿 html코드 객체 JS 가져오기
import hcode from "./hcode.js";

// 뷰JS 인스턴스 생성용 함수!
const makeVue = (x) => new Vue({ el: x });

// 1. 제목에 넣을 전역컴포넌트 만들기
Vue.component("tit-comp", {
  // 1-1. 템플릿 셋팅
  template: hcode.tit,
}); ///////// 전역컴포넌트 1 //////////

// 뷰인스턴스 생성하기
makeVue(".tit");

// 이미지번호 숫자증감 변수
let inum = 0;

// 세일가격 계산을 위한 임시변수
let temp;



// 상품명 배열
const goods = ["프레이컷", "아일렛기모", "베어부클", "포멀믹스톤"];

// 2. 갤러리 리스트에 넣을 전역컴포넌트 만들기
// ->>>> 자식 컴포넌트 !!!!!!!!!! (부모는? new Vue ~~)
Vue.component("list-comp", {
  // 2-1. template 옵션 : 태그구성
  // src 속성을 셋팅된 변수를 적용하기 위해
  // 속성앞에 v-bind:을 붙여서 v-bind:src 로 쓰면
  // 값으로 문자형을 써도 그 안의 값은 변수가 된다 !!!!!!!
  template: hcode.list,
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
      gname:
        "DE-" + this.setName() + this.endLet + (this.dataNum % 2 ? "🎄" : "👗"),
      // 상품가격
      gprice: this.setPrice(),

      // 4.세일가격 : 상품원래가격의 30%세일(원가격*0.7)
      // -> 외부의 전역변수temp에 원가격있음!
      salePrice: (temp * 0.7).toFixed(0),
      // 숫자.toFixed(자릿수) -> 소수점 아래 자리
    };
  },

  // 2-4. methods 속성 : 컴포넌트 내부 메서드 셋팅
  methods: {

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
      let rdm = Math.ceil(Math.random() * 17) + 3;
      let retVal = 20000 * rdm;
      // 세일가격 계산을 위한 임시변수에 할당후 리턴
      temp = retVal;
      return retVal;
    }, // setPrice

    // 세일여부 리턴메서드
    retSale() {
      // 세일 리턴
      return (
        this.dataNum == 3 ||
        this.dataNum == 5 ||
        this.dataNum == 14 ||
        this.dataNum == 22 ||
        this.dataNum == 26 ||
        this.dataNum == 38 ||
        this.dataNum == 45 ||
        this.dataNum == 50
      );
    }, // retSalse
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

});

///////////////// 상품상세정보 컴포넌트 ////////////////
Vue.component("win-comp", {
  template: hcode.detail,
}); ////////////// win-comp ///////////////////

/// win-comp 부모 컴포넌트 뷰 인스턴스 생성
new Vue({
  el: ".pbg",
  // DOM이 모두 로딩후 실행구역 (리액트의 useLayoutEffect와 유사함)
  mounted: function () {
    // 제이쿼리 코드를 사용가능!

    // 원래가격 변수 : 각 리스트 아이템 클릭 순간 셋팅
    let orgPrice;

    // 현재 리스트 순번 : 양쪽 이동버튼에서 사용
    let cIdx;

    // 1. 갤러리 리스트 클릭시 큰 이미지 박스 보이기
    $(".grid>div").on("click", function () {
      // console.log(this);

      // 현재리스트 순번 셋팅하기
      cIdx = $(this).index();
      // console.log(cIdx);

      // 클릭된 이미지 경로 읽어오기
      let isrc = $(this).find("img").attr("src");
      // console.log(isrc);
      // 상세 정보창 큰 이미지 변경하기
      $(".gimg img").attr("src", isrc);

      // 클릭된 상품 가격 읽어오기
      let price = $('aside h3',this).html();
      // console.log(price)
      // 클릭된 상품 가격 변경하기
      $('#gprice').html(price);

      
      // 클릭된 상품명 읽어오기
      let name = $('aside h2',this).html();
      // console.log(price)
      // 클릭된 상품명 변경하기
      $('#gtit').html(name);
      
      
      // 최초 가격 총합계 넣기
      // 원가 & 세일가격중 세일하는건 세일가격으로, 원가는 원가로 불러와야함
      // 세일가격이 마지막 요소로 나오기때문에 라스트 차일드로 불러오면 2개중 마지막, 1개중 1개 불러옴
      let tprice = $('aside h3 span:last-child',this).html();
      $('#total').html(tprice);

      // 원래가격 셋팅하기 : 원,콤마 모두 없애기!
      // 문자열.replace(바꿀놈,바뀔놈)
      orgPrice = Number(tprice.replace('원','').replace(/,/g,''));
      // console.log(orgPrice)
      
      // 상품상세 정보창 보이기
      $("#bgbx").show();

      // 개수 초기화
      sum.val('1');
    }); ////////// click ////////////


    // 개수대상 
    const sum = $('#sum');

    // 증감버튼 셋팅 //////
    $('.chg_num img').click(function(){
      // 클릭된 증감이미지 순번
      let idx = $(this).index();
      // console.log(idx);
      

      // 현재 개수
      let cnt = Number(sum.val())

      // 총합
      let setCnt;

      // 증가
      if(idx===0){
        setCnt = ++cnt;
        if(setCnt>50){setCnt = 50; cnt=50;}
      }
      // 감소
      else{
        setCnt = --cnt;
        if(setCnt<1){setCnt = 1; cnt=1;}
      }
      // 최종반영하기
      sum.val(setCnt);
      $('#total').html(addCommas(orgPrice*setCnt)+"원");
    })

    // 닫기버튼 셋팅
    $(".cbtn").on("click", (e) => {
      {
        e.preventDefault();
        $("#bgbx").hide();
      }
    });

    //정규식함수(숫자 세자리마다 콤마해주는 기능)
    const addCommas=(x)=> {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 이전 / 다음 버튼 셋팅하기
    // 대상 : .abtn
    $('.abtn').click(function(e){
      e.preventDefault();
      // 오른쪽 버튼이면 true
      let isR = $(this).is('.rb');

      // 오른쪽 : isR이 true냐?
      if(isR){
        // 다음순번
        ++cIdx;
        if(cIdx>49) cIdx=0;
      }
      // 왼쪽
      else{
        // 이전순번
        --cIdx;
        if(cIdx<0) cIdx=49;
      }

      // 정보 타겟요소(리스트 순번으로 가져옴)
      const target = $('.grid>div').eq(cIdx);
      // console.log(cIdx,target)

      // 처음 리스트 클릭하여 열때 셋팅한 것들은
      // 모두 다시 셋팅한다! 단, 주인공이 target!!!

      // 클릭된 이미지 경로 읽어오기
      let isrc = target.find("img").attr("src");
      // console.log(isrc);
      // 상세 정보창 큰 이미지 변경하기
      $(".gimg img").attr("src", isrc);

      // 클릭된 상품 가격 읽어오기
      let price = $('aside h3',target).html();
      // console.log(price)
      // 클릭된 상품 가격 변경하기
      $('#gprice').html(price);

      
      // 클릭된 상품명 읽어오기
      let name = $('aside h2',target).html();
      // console.log(price)
      // 클릭된 상품명 변경하기
      $('#gtit').html(name);

      // 최초 가격 총합계 넣기
      // 원가 & 세일가격중 세일하는건 세일가격으로, 원가는 원가로 불러와야함
      // 세일가격이 마지막 요소로 나오기때문에 라스트 차일드로 불러오면 2개중 마지막, 1개중 1개 불러옴
      let tprice = $('aside h3 span:last-child',target).html();
      $('#total').html(tprice);

      // 개수 초기화
      sum.val('1');
    }) //// abtn click ////

  },// mounted
}); ///////// win-comp 부모 //////////
