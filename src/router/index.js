import {createRouter, createWebHistory} from 'vue-router'
import Home from "../views/Home.vue";
import Main from "../views/Main";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/Main",
        name: "Main",
        component: Main
    },
    {
        path: "/register",
        name: "Register",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Register.vue")
    },
    {
        path: "/products/:productId/detail",
        name: "product-details",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/ProductDetail.vue")
    },

    {
        name: "Product",
        path: "/product",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/PostProduct.vue")
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Login.vue")
    },
    {
        path: "/account/:username",
        name: "Account",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Account.vue")
    },
    {
        path: "/products/:productId/edit",
        name: "EditProduct",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/EditProduct.vue")
    },
    {
        path: "/post",
        name: "Post",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/PostProduct.vue")
    },
    {
        path: "/cart",
        name: "Cart",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Cart.vue")
    },
    {
        path: "/account/:username/edit",
        name: "EditAccount",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/EditAccount.vue")
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router;