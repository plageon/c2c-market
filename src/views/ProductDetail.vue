<template>
  <section class="section" id="about">
    <!-- Title -->
    <div class="section-heading">
      <h3 class="title is-2">{{ product.title }}</h3>
      <h4 class="subtitle is-5">商品详情</h4>
      <div class="container">
        <p>{{ product.desc }}</p>
      </div>
    </div>

    <div class="columns has-same-height is-gapless">
      <div class="column">
        <!-- Profile -->
        <div class="card">
          <div class="card-content">
            <h3 class="title is-4">详细信息</h3>

            <div class="content">
              <table class="table-profile">
                <tr>
                  <th colspan="1"></th>
                  <th colspan="2"></th>
                </tr>
                <tr>
                  <td>价格:</td>
                  <td>￥{{ product.price }}</td>
                </tr>
                <tr>
                  <td>上架时间:</td>
                  <td>{{ product.time }}</td>
                </tr>
                <tr>
                  <td>发布者:</td>
                  <td>{{ product.owner }}</td>
                </tr>
              </table>
            </div>
            <br>
            <div class="buttons has-addons is-centered">
              <button v-if="!isOwner&&product.vacant" @click="buyProduct" class="button is-link">我想要</button>
              <button v-if="isOwner" @click="editProduct" class="button is-link">编辑商品</button>
              <button v-if="isOwner" @click="deleteProduct" class="button is-link">下架商品</button>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <!-- Profile picture -->
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="../assets/images/phone.jpg" alt="Placeholder image">
            </figure>
          </div>
        </div>
      </div>
      <Rating :enable-edit="false" :ratings="this.user.ratings" :owner="this.user.name" @check-user="checkOwner"></Rating>
    </div>
  </section>
</template>

<script>
import Rating from "@/components/Rating";
export default {
  name: "ProductDetail",
  components:{
    Rating,
  },
  data() {
    return {
      product: Object,
      loggedIn: "",
      isOwner: false,
      api:"",
      user:Object,
    };
  },
  methods: {
    async getProducts() {
      const id = this.$route.params.productId;
      const res = await fetch(this.api+`/products/${id}`);
      const data = await res.json();
      return data;
    },
    async buyProduct() {
      this.product.buyer=localStorage.name;
      this.product.vacant=false;
      const id = this.product.id;
      const res = await fetch(this.api+`/products/${id}`, {
        method: 'put',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(this.product)
      })
      const data = await res.json()
      this.product = data;
    },
    async editProduct() {
      const id = this.product.id;
      this.$router.push({path: `/products/${id}/edit`, params: {product: this.product}})
    },
    async deleteProduct() {
      if (confirm('确定要下架该商品吗？')) {
        const id = this.product.id;
        const res = await fetch(this.api+`/products/${id}`, {
          method: 'delete'
        })
        if (res.status === 200) {
          this.products = this.products.filter((product) => product.id !== id)
        } else {
          alert('下架商品失败')
        }
      }
    },
    async getOwner(){
      const owner=this.product.owner;
      const res=await fetch(this.api + "/users");
      const data=await res.json();
      for(const k in data){
        if(data[k].name===owner){
          this.user=data[k];
          break;
        }
      }
    },
    async checkOwner(owner){
      this.$router.push({path: `/account/${owner}`,});
    },
  },
  async created() {
    this.loggedIn = localStorage.loggedIn;
    if (!this.loggedIn) {
      this.$router.push({path: "/login"});
    }
    this.api=localStorage.api;
    this.product = await this.getProducts();
    //console.log(this.product)
    if (this.product.owner === localStorage.name) {
      this.isOwner = true;
    }
    this.getOwner();

  },
}
</script>

<style scoped>
@import "../css/bulma.css";
</style>