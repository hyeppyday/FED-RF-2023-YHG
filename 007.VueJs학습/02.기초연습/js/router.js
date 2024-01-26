// 뷰라우터 인스턴스 설정파일 - router.js

// 라우터 템플릿 만들기 : 내용 컴포넌트
let Trip = {
  template: `<div class="trip router">World Trip</div>`,
};
let Foods = {
  template: `
    <div v-bind:class="
        'foods router '+this.$route.params.cls
    ">
        World Foods {{ this.$route.params.item }}
    </div>`,
};

/* 
    [파라미터로 전달된 라우터 값을 읽는 코드법]
    this.$route.params.cls
    1. this : 현재 라우터를 사용하는 뷰 인스턴스
    2. $route : 현재 연결된 라우트 정보객체 ( 가장 큰 껍데기 )
    3. params : 라우트 하위 파라미터 전달속성
    4. cls / item : 전달된 파라미터 이름 ( 호출시 값이 나옴 )
*/

// 뷰 라우터 인스턴스 생성하기 ///////
// const router = new VueRouter({
// -> 변수에 담으면 아래쪽에서 별도로 export하기!
// export const router = new VueRouter({
// -> default없이 내보내기 할때에는 import하는 곳에서 {}를 꼭 사용하기!!
export default new VueRouter({
  routes: [
    // 첫번째 루트
    {
      path: "/trip",
      component: Trip,
    },
    // 두번째 루트
    {
      path: "/foods",
      component: Foods,
    },
    // 두번째 루트의 파라미터 버전 루트 추가!
    {
        // 파라미터를 받는 같은 path의 루트는
        // 호출과 구분을 위해 반드시 name속성을 설정해야함!
        name:'umsik',
        path:'/foods:item',
        // 경로뒤에 콜론(:)을 쓰고 파라미터 변수를 씀!
        component: Foods,
    },
  ],
});

// 변수에 담은 경우 하나 내보내기
// export default router;
