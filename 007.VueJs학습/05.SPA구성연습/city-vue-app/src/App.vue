<template>
  <div id="app">
    <TopArea/>
    <MainArea/>
    <FooterArea/>
  </div>
</template>

<script>
import TopArea from "./components/TopComp.vue";
import MainArea from "./components/MainComp.vue";
import FooterArea from "./components/FooterComp.vue";
export default {
  name: 'App',
  components:{
    TopArea,
    MainArea,
    FooterArea,
  },
}
</script>

<style>
#app {
width: 500px;
margin: 0 auto;
}
/* 라우터 */
.router{
    text-align: center;
    color: #fff;
    background: #fff no-repeat center/cover;
    height: 100%;
    line-height: 30vh;
    font-size: 24px;
    text-shadow: 2px 2px 2px #000;
    border-radius: 20px;
    box-shadow: 2px 2px 2px #0000008b;
}
.trip{
    background-image: url(https://as2.ftcdn.net/v2/jpg/03/73/40/29/1000_F_373402961_zHwVILZu4UNblYegPKkKTsyiuHdtRscG.jpg);
}
.foods{
    background-image: url(https://cdn.georgeinstitute.org/sites/default/files/styles/width1920_fallback/public/2020-10/world-food-day-2020.png);
}
.asso{
    text-align: center;
    border-top: 4px double darkgreen;
}
</style>
