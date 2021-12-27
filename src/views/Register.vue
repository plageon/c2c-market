<template>
  <section class="container">
    <div class="columns is-multiline">
      <div class="column is-8 is-offset-2 register">
        <div class="columns">
          <div class="column left">
            <h1 class="title is-1">格子铺</h1>
            <h2 class="subtitle colored is-4">校园在线交易平台校园在线交易平台校园在线交易平台</h2>
            <p>校园在线交易平台校园在线交易平台校园在线交易平台校园在线交易平台</p>
          </div>
          <div class="column right has-text-centered">
            <h1 class="title is-4">注册</h1>
            <p class="description">校园在线交易平台校园在线交易平台校园在线交易平台</p>
            <form @submit="checkForm">
              <div class="field">
                <div class="control">
                  <input class="input is-medium" type="text" placeholder="Name" v-model="user.name">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-medium" type="email" placeholder="Email" v-model="user.email">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-medium" type="password" placeholder="Password" v-model="user.password">
                </div>
              </div>
              <button class="button is-block is-primary is-fullwidth is-medium">注册</button>
              <br />
              <small><em>校园在线交易平台校园在线交易平台</em></small>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        name:"",
        // the email from the input is bound to this property, they are always going to be the same
        email: "",
        password: "",
        ratings:[0.0,0.0,0.0,0.0],
        comments:[],
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
      if (!this.user.name) {
        this.errors.push("Email required");
        this.errorMessage = "请输入您的昵称";
      }
      if (!this.user.email) {
        this.errors.push("Email required");
        this.errorMessage = "请输入您的邮箱";
      }
      // if no errors then log the user in
      if (!this.errors.length) {
        await this.registerUser(this.user);
      }
      else {
        alert(this.errorMessage)
      }
    },
    // this method logs in the user by sending a post request to the api, which responds with the user whose email is submitted if valid
    // variables in localStorage are set that store the user id, email, and the current state of being logged in
    async registerUser(user) {
      await fetch('api/users/',{
        method:"put",
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(user),
      });
      alert("注册成功");
      await this.$router.push({ path: "/" });
    }
  }
}
</script>

<style scoped >
@import "../css/bulma.css";
:root {
  --brandColor: hsl(166, 67%, 51%);
  --background: rgb(247, 247, 247);
  --textDark: hsla(0, 0%, 0%, 0.66);
  --textLight: hsla(0, 0%, 0%, 0.33);
}

body {
  background: var(--background);
  height: 100vh;
  color: var(--textDark);
}

.field:not(:last-child) {
  margin-bottom: 1rem;
}

.register {
  margin-top: 10rem;
  background: white;
  border-radius: 10px;
}

.left,
.right {
  padding: 4.5rem;
}

.left {
  border-right: 5px solid var(--background);
}

.left .title {
  font-weight: 800;
  letter-spacing: -2px;
}

.left .colored {
  color: var(--brandColor);
  font-weight: 500;
  margin-top: 1rem !important;
  letter-spacing: -1px;
}

.left p {
  color: var(--textLight);
  font-size: 1.15rem;
}

.right .title {
  font-weight: 800;
  letter-spacing: -1px;
}

.right .description {
  margin-top: 1rem;
  margin-bottom: 1rem !important;
  color: var(--textLight);
  font-size: 1.15rem;
}

.right small {
  color: var(--textLight);
}

input {
  font-size: 1rem;
}

input:focus {
  border-color: var(--brandColor) !important;
  box-shadow: 0 0 0 1px var(--brandColor) !important;
}

.fab,
.fas {
  color: var(--textLight);
  margin-right: 1rem;
}
</style>