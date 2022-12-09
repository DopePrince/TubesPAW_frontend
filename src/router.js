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
            path:"/",
            name: "admin",
            component: importComponent("DashboardLayout"),
            children:[
                {
                    path:"/",
                    name : "Root",
                    component : importComponent("DashboardIndex"),
                },
                // {
                //     path:"/gd",
                //     name:"Guided",
                //     component: importComponent("TodoList/ListItem"),
                // },
            ],
        },
    ],
});

export default router;