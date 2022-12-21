import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes:[
        {
            path:"/dashboard",
            name: "admin",
            component: importComponent("DashboardLayout"),
            children:[
                {
                    path:"/DashboardIndex",
                    name : "Root",
                    component : importComponent("DashboardIndex"),
                },
                {
                    path:"/kamar",
                    name:"ReservasiKamar",
                    component: importComponent("ToDoList/ReservasiKamar"),
                },
                {
                    path:"/room",
                    name:"RoomService",
                    component: importComponent("ToDoList/ServiceKamar"),
                },
                {
                    path:"/food",
                    name:"FoodService",
                    component: importComponent("ToDoList/FoodService"),
                },
                {
                    path:"/trip",
                    name:"OrderWisata",
                    component: importComponent("ToDoList/OrderWisata"),
                },
            ],
        },
        {
            path: "/register",
            name: "Register",
            component: importComponent("RegisterPage"),
        },
        {
            path: "/login",
            name: "Login",
            component: importComponent("LoginPage"),
        },
        {
            path: "/",
            name: "Home",
            component: importComponent("HomePage"),
        },
        {
            path: "*",
            redirect: "/"
        },
    ],
});

export default router;