<template>
  <section class="section" id="contact">
    <div class="container">
      <div class="section-heading">
        <h3 class="title is-2">发布新商品</h3>
        <h4 class="subtitle is-5">发布新商品</h4>
      </div>
      <br>

      <form @submit="checkForm">
        <div class="columns">
          <div class="column is-6 is-offset-3">
            <div class="box">
              <div class="field">
                <label class="label">标题</label>
                <div class="control">
                  <input class="input" type="text" placeholder="标题" v-model="product.title">
                </div>
              </div>

              <div class="field">
                <label class="label">价格</label>
                <div class="control has-icons-left">
                  <input class="input" type="number" placeholder="价格" v-model="product.price">
                  <span class="icon is-small is-left">￥</span>
                </div>
              </div>

              <div class="field">
                <label class="label">描述</label>
                <div class="control">
                  <textarea class="textarea" placeholder="描述" v-model="product.desc"></textarea>
                </div>
              </div>

              <div class="field is-grouped has-text-centered">
                <div class="control">
                  <button class="button is-link is-large" >
                    <span>发布</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>
  </section>
</template>

<script>
export default {
  name: "PostProduct",
  data() {
    return {
      loggedIn: "",
      product: {
        title: "",
        price: "",
        owner: "",
        desc: "",
        time:"",
        vacant:true,
        buyer:"",
      },
      errors: [],
    };
  },
  methods: {
    async checkForm(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.product.title) {
        this.errors.push("Title required!");
      }
      if (!this.errors.length) {
        this.postProduct(this.product);
      }
    },
    async postProduct(product) {
      product.owner = localStorage.name;
      const date=new Date();
      product.time=date.getFullYear()+ "年"+date.getMonth()+"月"+date.getDate()+"日";
      await fetch('api/products',{
        method:"post",
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(product),
      });
      alert("发布成功");
      await this.$router.push({ path: "/" });
      // this.$http.post(`${process.env.VUE_APP_API_URL}products`, product).then(
      //     (response) => {
      //       if (response.body) {
      //         this.$router.push({path: "/"});
      //       }
      //     },
      //     (response) => {
      //       this.errors.push(response.body.message);
      //     }
      // );
    },
  },
  created() {
    this.loggedIn = localStorage.loggedIn;
    if (!this.loggedIn) {
      this.$router.push({path: "/login"});
    }
  },
}
</script>

<style scoped>
@import "../css/bulma.css";
</style>