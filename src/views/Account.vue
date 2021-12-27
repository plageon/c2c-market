<template>
  <section class="section" id="about">
    <div class="columns has-same-height is-gapless">
      <div class="column">
        <rating v-if="!isOwner" :enable-edit="true" :ratings="[0,0,0,0]" :owner="this.owner"/>
        <rating v-if="isOwner" :enable-edit="false" :ratings="this.user.ratings" :owner="this.owner"/>
      </div>
      <div class="column">
        <div class="field">
          <div class="control">
            <input class="input is-medium" type="text" placeholder="Comment" v-model="newComment">
          </div>
        </div>
        <button @click="addComment" class="button is-block is-primary is-fullwidth is-medium">发布评论</button>
        <br />
        <div class="control">
          <comment :user="this.owner" :comments="this.user.comments"/>
        </div>

      </div>
    </div>
    <ProductList v-if="isOwner" :products="products" :enableDelete="true" :enable-forgive="false" :name="this.owner" @delete-product="deleteProduct"/>
    <ProductList v-if="!isOwner" :products="products" :enableDelete="false" :enable-forgive="false" :name="this.owner" @delete-product="deleteProduct"/>
  </section>

</template>

<script>
import ProductList from "../components/ProductList";
import Rating from "@/components/Rating";
import Comment from "@/components/Comment";

export default {
  name: "Account",
  components:{
    ProductList,
    Rating,
    Comment,
  },
  props:{

  },
  data() {
    return {
      products: [],
      loggedIn: "",
      isOwner:false,
      owner:String,
      ratings:Array,
      user:Object,
      id:String,
      newComment:"",
      api:String,
    };
  },
  methods: {
    async deleteProduct(productId) {
      //console.log("delete",productId);
      if(confirm('确定要下架该商品吗？')){
        const res=await fetch(localStorage.api+`/products/${productId}`,{
          method:'delete'
        })
        if(res.status===200){
          this.products=this.products.filter((product)=>product.id!==productId);
        }
        else {
          alert('下架商品失败');
        }
      }
    },
    async getProducts() {
      const res = await fetch(localStorage.api+'/products');
      const data = await res.json();
      const myproducts=[];
      for(const product of data){
        if(product.owner===this.owner){
          myproducts.push(product);
        }
      }
      return myproducts;
    },
    async getOwner(){
      const res=await fetch(localStorage.api + "/users");
      const data=await res.json();
      for(const k in data){
        if(data[k].name===this.owner){
          this.user=data[k];
          break;
        }
      }
    },
    async addComment(){
      const id=this.user.id;
      this.user.comments[localStorage.name]=this.newComment;
      console.log(this.user.comments)
      await fetch(this.api +`/users/${id}`,{
        method:"put",
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(this.user),
      });
      alert("发布评论成功");
    }
  },
  async created() {
    this.api=localStorage.api;
    this.loggedIn = localStorage.loggedIn;
    if (!this.loggedIn) {
      this.$router.push({path: "/login"});
    }
    this.owner=this.$route.params.username;
    //console.log(this.owner);
    if(this.owner===localStorage.name){
      this.isOwner=true;
    }
    this.products=await this.getProducts();
    await this.getOwner();

  },
}
</script>

<style scoped>
@import "../css/bulma.css";
</style>