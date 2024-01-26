<template>
  <footer>
    <address>서울시 강남구 역삼동 119 뷰엑스B</address>
    <p class="asso">
      <router-link to="/trip" tag="button"> 세계여행사</router-link>
      <router-link to="/foods"> 세계먹거리</router-link>
      <router-view></router-view>
    </p>
</footer>
</template>

<script>
export default {
  name: "InfoArea",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  border: 1px solid #ccc;
  text-align: center;
  padding: 20px;
}
</style>
