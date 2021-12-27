<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        搜索发布内容
      </p>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable"><a class="navbar-link">{{ searchDomain==="title"?"商品标题":"发布用户" }}</a>
            <div class="navbar-dropdown"><a @click="switchToTitle" class="navbar-item">商品标题</a><a @click="switchToOwner" class="navbar-item">发布用户</a>
            </div>
          </div>
        </div>
      </div>
<!--      <a href="#" class="card-header-icon" aria-label="more options">-->
<!--                  <span class="icon">-->
<!--                    <i class="fa fa-angle-down" aria-hidden="true"></i>-->
<!--                  </span>-->
<!--      </a>-->
    </header>
    <div class="card-content">
      <div class="content">
        <div class="control has-icons-left has-icons-right">
          <input @input="search" class="input is-medium" type="text" placeholder="" v-model="searchKey">
          <span class="icon is-medium is-left"><i class="fa fa-search"></i></span>
          <span class="icon is-medium is-right"><i class="fa fa-check"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data(){
    return{
      searchKey:"",
      searchDomain:"title"
    }
  },
  methods:{
    search(){
      console.log("search success")
      this.$emit('search-title',this.searchKey,this.searchDomain);
    },
    switchToTitle(){
      this.searchDomain="title";
    },
    switchToOwner(){
      this.searchDomain="owner";
    },
  }
}
</script>

<style scoped >
@import "../css/bulma.css";
</style>