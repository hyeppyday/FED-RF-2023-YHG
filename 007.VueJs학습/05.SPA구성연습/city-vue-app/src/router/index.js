import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

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

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    // 첫번째 루트
    {
      path: "/trip",
      name:'Trip',
      component: Trip,
    },
    // 두번째 루트
    {
      path: "/foods",
      name:'Foods',
      component: Foods,
    },
  ]
})
