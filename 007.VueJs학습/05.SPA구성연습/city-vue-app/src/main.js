// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import store from './store'
import router from './router'

Vue.config.productionTip = false

const linkData2 = {
  "세계여행사": {
      link:{ path: "/trip" },
      menu:[]
  },
  "세계먹거리": {
      link:{ path: "/foods" },
      menu:{
          "피자": { 
              name: "umsik", 
              params: { item: "피자", cls: "pizza" } },
          "파스타": { 
              name: "umsik", 
              params: { item: "파스타", cls: "pasta" } },
          "똠양꿍": { 
              name: "umsik", 
              params: { item: "똠양꿍", cls: "ddom" } },

      }
  },
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  data:{
    // 외부 데이터를 뷰 인스턴스 내부에 데이터화 한다
    linkData : linkData2, // 하위 메뉴구조 데이터로 변경!
}, // data

mounted(){
    this.$router.push('/trip');

},
  components: { App },
  template: '<App/>',
  created(){
    store.commit('initSet');
  }
})
