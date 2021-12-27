<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item" >
          <img src="https://cdn.emk.dev/templates/bulma-logo-light.png" alt="Logo">
        </div>
        <router-link to="/" class="navbar-item" style="font-weight:600;">格子铺</router-link>
        <span class="navbar-burger burger" data-target="navbarMenu">
            <span></span>
            <span></span>
            <span></span>
          </span>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end">
          <router-link to="/post" class="navbar-item">发布新商品</router-link>
          <router-link v-if="loggedIn" :to="{path:'/account/'+username}" class="navbar-item">你好！{{username}}</router-link>
          <router-link to="/login" v-if="!loggedIn" class="navbar-item">登录</router-link>
          <div v-if="loggedIn" class="navbar-menu" id="navMenu">
            <div class="navbar-end">
              <div class="navbar-item has-dropdown is-hoverable"><a class="navbar-link">账号</a>
                <div class="navbar-dropdown"><router-link :to="{path:'/account/'+username}" class="navbar-item">我的主页</router-link>
                  <router-link to="/" class="navbar-item" @click="$emit('edit-account')">设置</router-link>
                  <router-link to="/" class="navbar-item" @click="$emit('goto-cart')">购物车</router-link>
                  <hr class="navbar-divider" />
                  <router-link to="/" class="navbar-item" @click="$emit('logout')">登出</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  props:{

  },
  data(){
    return{
      username:'',
      loggedIn:String,
    }
  },
  emits:['logout','goto-cart','edit-account'],
  created() {
    this.loggedIn = localStorage.loggedIn;
    //console.log(this.loggedIn)
    if(this.loggedIn){
      this.username=localStorage.name;
    }
  }
}

</script>

<style scoped>
@import "../css/bulma.css";
</style>