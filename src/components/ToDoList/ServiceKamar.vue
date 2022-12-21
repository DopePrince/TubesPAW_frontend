<template>
    <v-main class="list">
        <v-card>
            <v-list-item>
                <v-list-item-avatar color="white">   
                    <img
                        src="../../../src/assets/logo_rmvd.png"
                        alt="Not found"
                    >
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="headline">Service</v-list-item-title>
                <v-list-item-subtitle >---Silahkan Pesan Layanan anda---</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-card-title>
                <v-text-field
                  v-model = "search"
                  append-icon="mdi-magnify"
                  label="Search"
                  outlined
                  hide
                  details
                  style="margin-top: 30px" >
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true">Tambah</v-btn>
            </v-card-title>
        </v-card>

        <v-card>
            <v-data-table :headers="headers" :items="todos" :search="search">
                <template v-slot:[`item.action`]="{ item }">
                    <v-btn small class="mr-2 blue-grey lighten-3" @click="editItem(item)">edit</v-btn>
                    <v-btn small class="mr-2 blue-grey lighten-3" @click="deleteItem(item)">delete</v-btn>
                </template>

                <template v-slot:[`item.status_pembayaran`]="{ item }">
                  {{ item.status_pembayaran == 1 ? 'Lunas' : 'Belum Bayar' }}
                </template>

                

                <template v-slot:[`item.id_service`]="{ item }">
                    
                        {{ getNamaService(item.id_service) }}

                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Service</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-select
                        v-if="formTodo.id_update==0"
                        v-model="formTodo.booking"
                        :items="bookings"
                        item-text="id"
                        item-value="id"
                        label="No Booking"
                        persistent-hint
                        return-object
                        single-line
                        ></v-select>

                        <v-select
                            v-model="formTodo.status_pembayaran"

                            :items="['Lunas', 'Belum Lunas' ]"
                            label = "Status Pembayaran"
                            required>
                        </v-select>

                        <!-- <template v-slot:[`item.status_pembayaran`]="{ item }">
                            <div v-if="item.status_pembayaran == 1">Lunas</div>
                            <div v-else-if="item.status_pembayaran == 0">Belum Bayar</div>
                        </template> -->

                        <!-- <v-text-field
                            v-model="formTodo.status_pembayaran"
                            label="Status Pembayaran"
                            required>
                        </v-text-field> -->

                        <v-select
                        v-model="formTodo.service"
                        :items="services"
                        item-text="nama_service"
                        item-value="id"
                        label="Nama Service"
                        persistent-hint
                        return-object
                        single-line
                        ></v-select>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                    <v-btn v-if="formTodo.id_update==0" color="blue darken-1" text @click="addOrderServices">Save</v-btn>
                    <v-btn v-else color="blue darken-1" text @click="updateOrderServices">Save</v-btn>
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
                booking: 0,
                service : undefined,
                status_pembayaran: undefined,
                id_update: 0
            },
            bookings : [],
            services : [],
            search: null,
            dialog: false,
            headers: [
                {
                    text: "No Booking",
                    align: "start",
                    sortable: true,
                    value: "id_booking",
                },
                { text: "Status Pembayaran", value: "status_pembayaran" },
                { text: "Nama Service", value: "id_service" },
                { text: "Action", value: "action" },
            ],
            todos:[],
      
            };
        },
        mounted(){
            this.showBookings();
            this.showOrderService();
            this.showService();
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
                    booking: undefined,
                    service : undefined,
                    status_pembayaran: undefined,
                    id_update: 0
                };
            },
            tambah(){
                this.dialog=true;
            },
            showBookings(){
                axios.get('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/bookings', {

                })
                    .then((response) => {
                    this.bookings = response.data.data
                    console.log(this.bookings)
                    })
                    .catch((error) => {
                    console.log(error)
                    })
             },
             showOrderService(){
                axios.get('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/orderservices', {

                })
                    .then((response) => {
                    this.todos = response.data.data
                    this.todos[0].id_booking
                    })
                    .catch((error) => {
                    console.log(error)
                    })
             },
             showService(){
                axios.get('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/services', {

                })
                    .then((response) => {
                    this.services = response.data.data
                    console.log(this.services)
                    })
                    .catch((error) => {
                    console.log(error)
                    })
             },
             addOrderServices(){
                // alert(this.formTodo.booking.id)
                // alert(this.formTodo.service.id)

                axios.post('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/orderservices', {
                    id_booking: this.formTodo.booking.id, // ini nanti dari yang local storage yaww
                    id_service: this.formTodo.service.id,
                    status_pembayaran:this.formTodo.status_pembayaran == 'Lunas' ? 1 : 0,
                }, {
                    //ini buayt askese token
                    // headers: {
                    // 'Authorization': `Bearer ${access_token}`
                    // }

                })
                    .then((response) => {
                    console.log(response)
                    this.dialog = false
                    this.showOrderService();
                    })
                    .catch((error) => {
                    console.log(error.response.data)
                    })
             },
             editItem(item){

                alert(item.id_booking)
                this.formTodo.booking = item.id_booking
                this.formTodo.status_pembayaran = item.status_pembayaran == 1 ? 'Lunas' : 'Belum Bayar'
                this.formTodo.service = this.getNamaServiceObj(item.id_service)
                this.dialog=true;
                this.formTodo.id_update = item.id
             },
            updateOrderServices(){
                axios.put('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/orderservices/' + this.formTodo.id_update, {
                    id_booking: this.formTodo.booking, // ini nanti dari yang local storage yaww
                    id_service: this.formTodo.service.id,
                    status_pembayaran:this.formTodo.status_pembayaran == 'Lunas' ? 1 : 0,
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
                    this.showOrderService();
                    })
                    .catch((error) => {
                    console.log(error.response.data)
                    })
            },
            deleteItem(item){
                axios.delete('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/orderservices/' + item.id, {
                    //ini buayt askese token
                    // headers: {
                    // 'Authorization': `Bearer ${access_token}`
                    // }

                })
                    .then((response) => {
                    console.log(response)
                    this.showOrderService();
                    })
                    .catch((error) => {
                    console.log(error.response.data)
                    })
            },
        
            getNamaService(id_service){
                let service = this.services.find(service => service.id == id_service)
                return service.nama_service
            },
            getNamaServiceObj(id_service){
                let service = this.services.find(service => service.id == id_service)
                return service
            },
            
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