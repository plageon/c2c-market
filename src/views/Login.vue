<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-black">登录</h3>
          <hr class="login-hr">
          <p class="subtitle has-text-black">登录后进行交易</p>
          <div class="box">
            <figure class="avatar">
              <img src="../assets/logo.png">
            </figure>
            <form @submit="checkForm">
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="email" placeholder="Your Email" autofocus="" name="email" v-model="user.email">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" placeholder="Your Password" name="password" v-model="user.password">
                </div>
              </div>
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox">
                  记住我
                </label>
              </div>
              <button class="button is-block is-info is-large is-fullwidth" >Login <i class="fa fa-sign-in" aria-hidden="true"></i></button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link to="/register">立即注册</router-link> &nbsp;·&nbsp;
            <a href="../">忘记密码</a> &nbsp;·&nbsp;
            <a href="../">帮助</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      user: {
        // the email from the input is bound to this property, they are always going to be the same
        name:"",
        email: "",
        password: ""
      },
      errors: [],
      errorMessage: ""
    };
  },
  methods: {
    // this method uses an if statement to determin if the data entered in the form is valid, and if there are errors pushes them to the errors array where they will be displayed by the template
    async checkForm(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.user.email) {
        this.errors.push("Email required");
        this.errorMessage = "Please enter an email address";
      }
      // if no errors then log the user in
      if (!this.errors.length) {
        await this.loginUser(this.user);
      }
    },
    // this method logs in the user by sending a post request to the api, which responds with the user whose email is submitted if valid
    // variables in localStorage are set that store the user id, email, and the current state of being logged in
    async loginUser(user) {
      const res=await fetch('api/users');
      const data=await res.json();
      var found=false;
      for (const dataKey in data) {
        //console.log(data[dataKey])
        if(data[dataKey].email===user.email){
          if(data[dataKey].password===user.password){
            this.user.name=data[dataKey].name;
            this.user.id=data[dataKey].id;
            this.loginSuccess();
          }
          else {
            alert("wrong password");
          }
          found=true;
          break;
        }
      }
      if(!found){
        alert("user not found");
      }
    },
    loginSuccess(){
      console.log("login success")
      localStorage.loggedIn = "yes";
      localStorage.name=this.user.name;
      localStorage.email = this.user.email;
      localStorage.id=this.user.id;
      this.$emit('login');
      if (this.$route.path === "/login") {
        this.$router.push({ path: "/" });
      }

    }
  }
}
</script>

<style scoped >
@import "../css/bulma.css";

</style>