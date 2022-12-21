"use strict";(self["webpackChunktubespaw_frontend"]=self["webpackChunktubespaw_frontend"]||[]).push([[690],{4690:function(t,o,e){e.r(o),e.d(o,{default:function(){return u}});var a=function(){var t=this,o=t._self._c;return o("v-main",{staticClass:"list"},[o("v-card",[o("v-list-item",[o("v-list-item-avatar",{attrs:{color:"white"}},[o("img",{attrs:{src:e(2327),alt:"Not found"}})]),o("v-list-item-content",[o("v-list-item-title",{staticClass:"headline"},[t._v("Food Service")]),o("v-list-item-subtitle",[t._v("--- Order Food You Like ---")])],1)],1),o("v-card-title",[o("v-text-field",{staticStyle:{"margin-top":"30px"},attrs:{"append-icon":"mdi-magnify",label:"Search",outlined:"",hide:"",details:""},model:{value:t.search,callback:function(o){t.search=o},expression:"search"}}),o("v-spacer"),o("v-btn",{attrs:{color:"success",dark:""},on:{click:t.tambah}},[t._v("Tambah")])],1)],1),o("v-card",[o("v-data-table",{attrs:{headers:t.headers,items:t.todos,search:t.search},scopedSlots:t._u([{key:"item.id_menu",fn:function({item:e}){return t._l(t.menus,(function(a){return o("div",{key:a.id},[e.id_menu==a.id?o("div",[t._v(t._s(a.nama_menu))]):t._e()])}))}},{key:"item.status_pembayaran",fn:function({item:e}){return[1==e.status_pembayaran?o("div",[t._v("Lunas")]):0==e.status_pembayaran?o("div",[t._v("Belum Bayar")]):t._e()]}},{key:"item.total",fn:function({item:o}){return[t._v(" "+t._s(t.formatCurrency(o.total))+" ")]}},{key:"item.action",fn:function({item:e}){return[o("v-btn",{staticClass:"mr-2 blue-grey lighten-3",attrs:{small:""},on:{click:function(o){return t.editItem(e)}}},[t._v("edit")]),o("v-btn",{staticClass:"mr-2 blue-grey lighten-3",attrs:{small:""},on:{click:function(o){return t.deleteItem(e)}}},[t._v("delete")])]}}],null,!0)})],1),o("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:t.dialog,callback:function(o){t.dialog=o},expression:"dialog"}},[o("v-card",[o("v-card-title",[o("span",{staticClass:"headline"},[t._v("Order Makanan")])]),o("v-card-text",[o("v-container",[0==t.formTodo.id_update?o("v-select",{attrs:{items:t.bookings,"item-text":"id","item-value":"id",label:"Nomor Booking","persistent-hint":"","return-object":"","single-line":""},model:{value:t.formTodo.id_booking,callback:function(o){t.$set(t.formTodo,"id_booking",o)},expression:"formTodo.id_booking"}}):t._e(),o("v-select",{attrs:{items:t.menus,"item-text":"nama_menu","item-value":"id",label:"Select Food","persistent-hint":"","return-object":"","single-line":""},model:{value:t.formTodo.id_menu,callback:function(o){t.$set(t.formTodo,"id_menu",o)},expression:"formTodo.id_menu"}}),o("v-select",{attrs:{items:["Lunas","Belum Bayar"],label:"Status Pembayaran",required:""},model:{value:t.formTodo.status_pembayaran,callback:function(o){t.$set(t.formTodo,"status_pembayaran",o)},expression:"formTodo.status_pembayaran"}}),o("v-text-field",{attrs:{label:"Masukan Jumlah Order",type:"number",required:""},model:{value:t.formTodo.jumlah,callback:function(o){t.$set(t.formTodo,"jumlah",o)},expression:"formTodo.jumlah"}}),t.formTodo.id_booking?o("div",[t._v(" "+t._s(t.idBook=t.formTodo.id_booking.id)+" ")]):t._e(),t.formTodo.id_menu?o("div",[t._v(" "+t._s(t.idMenu=t.formTodo.id_menu.id)+" ")]):t._e(),t.formTodo.status_pembayaran?o("div",[t._v(" "+t._s(t.stat=t.formTodo.status_pembayaran.idp)+" ")]):t._e(),o("v-text-field",{attrs:{label:"Total yang dibayar",type:"number",required:""},model:{value:t.formTodo.total,callback:function(o){t.$set(t.formTodo,"total",o)},expression:"formTodo.total"}})],1)],1),o("v-card-actions",[o("v-spacer"),o("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.cancel}},[t._v("Cancel")]),0==t.formTodo.id_update?o("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.addorderfobs}},[t._v("Sav2e")]):o("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.updateBookings}},[t._v("Save")])],1)],1)],1)],1)},s=[],i=(e(7658),e(4311)),n={name:"ListItem",data(){return{formTodo:{id_booking:null,id_menu:null,status_pembayaran:null,jumlah:0,total:0,id_update:0},harga:null,stat:null,idMenu:null,idBook:null,totalinOut:null,menus:[],hargamenu:null,bookings:[],search:null,dialog:!1,headers:[{text:"Nomor Booking",align:"start",sortable:!0,value:"id_booking"},{text:"Nama Menu",value:"id_menu"},{text:"Status Pembayaran",value:"status_pembayaran"},{text:"Jumlah",value:"jumlah"},{text:"Total",value:"total"},{text:"Aksi",value:"action"}],todos:[]}},mounted(){this.showOrdersFoods(),this.showBooking(),this.showMenus()},methods:{save(){this.todos.push(this.formTodo),this.resetForm(),this.dialog=!1},cancel(){this.resetForm(),this.dialog=!1},resetForm(){this.formTodo={id_booking:null,id_menu:null,status_pembayaran:null,jumlah:0,total:0,id_update:0}},tambah(){this.dialog=!0},showBooking(){i.Z.get("https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/bookings",{}).then((t=>{this.bookings=t.data.data})).catch((t=>{console.log(t)}))},formatCurrency(t){return t.toLocaleString("id-ID",{style:"currency",currency:"IDR"})},showOrdersFoods(){i.Z.get("https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/orderfobs",{}).then((t=>{this.todos=t.data.data})).catch((t=>{console.log(t)}))},showMenus(){i.Z.get("https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/fobs",{}).then((t=>{this.menus=t.data.data,console.log(this.menus)})).catch((t=>{console.log(t)}))},addorderfobs(){this.hargamenu=this.formTodo.id_menu.harga*this.formTodo.jumlah,i.Z.post("https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/orderfobs",{id_booking:this.idBook,id_menu:this.idMenu,status_pembayaran:this.stat,jumlah:this.formTodo.jumlah,total:this.hargamenu},{}).then((t=>{console.log(t),this.dialog=!1,this.resetForm(),this.showOrdersFoods()})).catch((t=>{console.log(t.response.data)}))},editItem(t){this.formTodo.id_update=t.id,this.formTodo.id_booking=t.id_booking,this.formTodo.status_pembayaran=1==t.status_pembayaran?"Lunas":"Belum Bayar",this.formTodo.id_menu=t.id_menu,this.formTodo.jumlah=t.jumlah,this.formTodo.total=t.total,this.dialog=!0},updateBookings(){i.Z.put("https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/orderfobs/"+this.formTodo.id_update,{id_booking:this.formTodo.id_booking,id_menu:this.formTodo.id_menu.id,status_pembayaran:"Lunas"==this.formTodo.status_pembayaran?1:0,jumlah:this.formTodo.jumlah,total:this.formTodo.total},{}).then((t=>{console.log(t),this.dialog=!1,this.resetForm(),this.showOrdersFoods()})).catch((t=>{console.log(t.response.data)}))},deleteItem(t){i.Z["delete"]("https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/orderfobs/"+t.id,{}).then((t=>{console.log(t),this.showOrdersFoods()})).catch((t=>{console.log(t.response.data)}))}}},r=n,l=e(1001),d=(0,l.Z)(r,a,s,!1,null,null,null),u=d.exports},2327:function(t,o,e){t.exports=e.p+"img/logo_rmvd.fe5e43da.png"}}]);
//# sourceMappingURL=690.504f8826.js.map