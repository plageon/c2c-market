<template>
  <div class="column">
    <!-- Skills -->
    <div class="card">
      <div class="card-content skills-content">
        <h3 class="title is-4">卖家{{ owner }}评分</h3>
        <div class="content">

          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>商品质量:</strong>
                  <br>
                  <star-rating v-model:rating="rating0" :increment="increment" :read-only="!enableRating"/>
                </p>
              </div>
            </div>
          </article>

          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>售后服务:</strong>
                  <br>
                  <star-rating v-model:rating="rating1" :increment="increment" :read-only="!enableRating"/>
                </p>
              </div>
            </div>
          </article>

          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>卖家信誉:</strong>
                  <br>
                  <star-rating v-model:rating="rating2" :increment="increment" :read-only="!enableRating"/>
                </p>
              </div>
            </div>
          </article>

          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>总体评分:</strong>
                  <br>
                  <star-rating v-model:rating="rating3" :increment="increment" :read-only="!enableRating"/>
                </p>
              </div>
            </div>
          </article>
          <div class="buttons has-addons is-centered">
            <button v-if="!enableEdit" @click="$emit('check-user',owner)" class="button is-link">{{ owner }}的主页</button>
            <button v-if="enableRating" @click="rateUser" class="button is-link">评价</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';
export default {
  name: "Rating.vue",
  components:{
    StarRating,
  },
  props:{
    ratings:Array,
    enableEdit:Boolean,
    owner:String,
  },
  data(){
    return{
      rating0:0.0,
      rating1:0.0,
      rating2:0.0,
      rating3:0.0,
      increment:1,
      enableRating:false,
    }
  },
  methods:{
    rateUser(){
      this.enableRating=false;
    },
  },
  emits:["check-user"],
  created() {
    if(!this.enableEdit){
      this.rating0=this.ratings[0];
      this.rating1=this.ratings[1];
      this.rating2=this.ratings[2];
      this.rating3=this.ratings[3];
      this.increment=0.1;
    }
    else {
      this.increment=1;
      this.enableRating=true;
    }
  },
}
</script>

<style scoped>

</style>