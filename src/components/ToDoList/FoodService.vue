<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="white">   
                    <img src="../../../src/assets/logo_rmvd.png" alt="Not found">
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Food Service</v-list-item-title>
                <v-list-item-subtitle >--- Order Food You Like ---</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-card-title>
                <v-text-field v-model = "search" append-icon="mdi-magnify" label="Search" outlined hide details style="margin-top: 30px" ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="tambah">Tambah</v-btn>
            </v-card-title>
        </v-card>

        <v-card>
            <v-data-table :headers="headers" :items="todos" :search="search">
                <template v-slot:[`item.id_menu`]="{ item }">
                    <div v-for="it in menus" :key="it.id">
                        <div v-if="item.id_menu == it.id">{{ it.nama_menu }}</div>
                    </div>
                </template>
                <template v-slot:[`item.status_pembayaran`]="{ item }">
                    <div v-if="item.status_pembayaran == 1">Lunas</div>
                    <div v-else-if="item.status_pembayaran == 0">Belum Bayar</div>
                </template>
                <template v-slot:[`item.total`]="{ item }">
                    {{ formatCurrency(item.total) }}
                </template>
                <template v-slot:[`item.action`]="{ item }">
                    <v-btn small class="mr-2 blue-grey lighten-3" @click="editItem(item)">edit</v-btn>
                    <v-btn small class="mr-2 blue-grey lighten-3" @click="deleteItem(item)">delete</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Order Makanan</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        
                        <v-select v-if="formTodo.id_update==0" v-model="formTodo.id_booking" :items="bookings" item-text="id" item-value="id" label="Nomor Booking" persistent-hint return-object single-line></v-select>
                        <v-select v-model="formTodo.id_menu" :items="menus" item-text="nama_menu" item-value="id" label="Select Food" persistent-hint return-object single-line></v-select>
                        <v-select
                            v-model="formTodo.status_pembayaran"
                            :items="['Lunas', 'Belum Bayar' ]"
                            label = "Status Pembayaran"
                            required>
                        </v-select>
                        <v-text-field v-model="formTodo.jumlah" label="Masukan Jumlah Order" type="number" required></v-text-field>
                        <div v-if="formTodo.id_booking">
                            {{ idBook = formTodo.id_booking.id }}
                        </div>
                        <div v-if="formTodo.id_menu">
                            {{ idMenu = formTodo.id_menu.id }}
                        </div>
                        <div v-if="formTodo.status_pembayaran">
                            {{ stat = formTodo.status_pembayaran.idp }}
                        </div>
                        <v-text-field v-model="formTodo.total" label="Total yang dibayar" type="number" required></v-text-field>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                    <v-btn v-if="formTodo.id_update==0" color="blue darken-1" text @click="addorderfobs">Sav2e</v-btn>
                    <v-btn v-else color="blue darken-1" text @click="updateBookings">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-main>
</template>
<script>
import axios from 'axios';

export default {
    name: "ListItem",
    data(){
        return {
            formTodo : {
                id_booking: null,
                id_menu : null,
                status_pembayaran: null,
                jumlah: 0,
                total: 0,
                id_update:0,
            },
            harga: null,
            stat: null,
            idMenu: null,
            idBook: null,
            totalinOut: null,
            menus : [],
            hargamenu: null,
            bookings : [],
            search: null,
            dialog: false,
            headers: [
                {
                    text: "Nomor Booking",
                    align: "start",
                    sortable: true,
                    value: "id_booking",
                },
                { text: "Nama Menu", value: "id_menu" },
                { text: "Status Pembayaran", value: "status_pembayaran" },
                { text: "Jumlah", value: "jumlah" },
                { text: "Total", value: "total"},
                { text: "Aksi", value: "action"}
            ],
            todos:[],
      
            };
        },
        mounted(){
            this.showOrdersFoods();
            this.showBooking();
            this.showMenus();
        },
        methods: {
            save(){
                this.todos.push(this.formTodo);
                this.resetForm();
                this.dialog = false;
            },
            cancel(){
                this.resetForm();
                this.dialog = false;
            },
            resetForm(){
                this.formTodo = {
                    id_booking: null,
                    id_menu : null,
                    status_pembayaran: null,
                    jumlah: 0,
                    total: 0,
                    id_update:0,
                };
            },
            tambah(){
                this.dialog=true;
            },
            showBooking(){
                axios.get('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/bookings', {

                })
                    .then((response) => {
                    this.bookings = response.data.data
                    })
                    .catch((error) => {
                    console.log(error)
                    })
             },
             formatCurrency(value){
                return value.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})
             },
             showOrdersFoods(){
                axios.get('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/orderfobs', {

                })
                    .then((response) => {
                    this.todos = response.data.data
                   
                    })
                    .catch((error) => {
                    console.log(error)
                    })
             },
             showMenus(){
                axios.get('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/fobs', {

                })
                    .then((response) => {
                    this.menus = response.data.data
                    console.log(this.menus)
                    })
                    .catch((error) => {
                    console.log(error)
                    })
             },
             addorderfobs(){ 

                this.hargamenu = this.formTodo.id_menu.harga * this.formTodo.jumlah

                
                axios.post('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/orderfobs', {
                    id_booking: this.idBook, 
                    id_menu: this.idMenu,
                    status_pembayaran: this.stat,
                    jumlah: this.formTodo.jumlah,
                    total: this.hargamenu,  
                }, {
                    //ini buayt askese token
                    // headers: {
                    // 'Authorization': `Bearer ${access_token}`
                    // }

                })
                    .then((response) => {
                    console.log(response)
                    this.dialog = false
                    this.resetForm();
                    this.showOrdersFoods();
                    })
                    .catch((error) => {
                    console.log(error.response.data)
                    })
             },
             editItem(item){
                this.formTodo.id_update = item.id
                this.formTodo.id_booking = item.id_booking
                this.formTodo.status_pembayaran = item.status_pembayaran == 1 ? 'Lunas' : 'Belum Bayar'
                this.formTodo.id_menu = item.id_menu
                this.formTodo.jumlah = item.jumlah  
                this.formTodo.total = item.total
                this.dialog=true;
             },
            updateBookings(){
              
                axios.put('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/orderfobs/' + this.formTodo.id_update, {
                    id_booking: this.formTodo.id_booking, 
                    id_menu: this.formTodo.id_menu.id,
                    status_pembayaran: this.formTodo.status_pembayaran == "Lunas" ? 1 : 0,
                    jumlah: this.formTodo.jumlah,
                    total: this.formTodo.total,   

                    // id_booking: 8, 
                    // id_menu: 1,
                    // status_pembayaran: 1,
                    // jumlah: 2,
                    // total:10, 
                }, {
                    //ini buayt askese token
                    // headers: {
                    // 'Authorization': `Bearer ${access_token}`
                    // }

                })
                    .then((response) => {
                        console.log(response)
                        this.dialog = false
                        this.resetForm()
                        this.showOrdersFoods();
                    })
                    .catch((error) => {
                        console.log(error.response.data)
                    })
            },
            deleteItem(item){
                axios.delete('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/orderfobs/' + item.id, {
                    //ini buayt askese token
                    // headers: {
                    // 'Authorization': `Bearer ${access_token}`
                    // }

                })
                    .then((response) => {
                    console.log(response)
                    this.showOrdersFoods();
                    })
                    .catch((error) => {
                    console.log(error.response.data)
                    })
            }
        },
    };
</script>
<style>
    .text{
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        font-size: 40px;
        font-style: italic;
    }
</style>