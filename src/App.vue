<template>
  <div id="app">
    <div class="app-container">
      <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
      />
      <Header :loggedIn="loggedIn" @logout="logOutUser" @goto-cart="gotoCart" @edit-account="editAccount"/>
      <router-view @login="toggleUser"></router-view>
      <Footer/>
    </div>
  </div>
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data: function () {
    return {
      loggedIn: "",
    };
  },
  methods: {
    logOutUser() {
      localStorage.loggedIn = "";
      //Local Storage can only set strings
      this.loggedIn = localStorage.loggedIn;
      //this.$emit("$loggedOut");
      this.$router.push({path: "/"});
    },
    toggleUser() {
      //console.log("toggleuser");
      this.loggedIn=localStorage.loggedIn;
      // const dropDown = document.querySelector(".dropdown-menu");
      // dropDown.classList.contains("is-hidden")
      //     ? dropDown.classList.remove("is-hidden")
      //     : dropDown.classList.add("is-hidden");

    },
    gotoCart(){
      this.$router.push({path:"/cart"});
    },
    editAccount(){
      const name=localStorage.name
      this.$router.push({path:`/account/${name}/edit`})
    }
  },
  created() {
    this.loggedIn = localStorage.loggedIn;
    localStorage.api="http://localhost:5050"
    // EventBus.$on("$loggedIn", () => {
    //   localStorage.loggedIn = "yes";
    //   this.loggedIn = localStorage.loggedIn;
    //   this.id = localStorage.username;
    // });
  },
}
</script>

<style scoped >
@import "./css/bulma.css";

</style>
