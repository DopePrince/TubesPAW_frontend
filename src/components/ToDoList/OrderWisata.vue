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
                    <v-list-item-title class="headline">Paket Wisata</v-list-item-title>
                <v-list-item-subtitle >---Pilih Paket Wisata mu---</v-list-item-subtitle>
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
                <v-btn color="success" dark @click="tambah">Tambah</v-btn>
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

                <template v-slot:[`item.supir`]="{ item }">
                  {{ item.supir == 1 ? 'Pakai' : 'Tidak' }}
                </template>

                <template v-slot:[`item.kendaraan`]="{ item }">
                  {{ item.kendaraan == 1 ? 'Mobil' : 'Bus' }}
                </template>

                <template v-slot:[`item.id_wisata`]="{ item }">
                    
                        {{ getNamaWisata(item.id_wisata) }}

                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Pesan Paket Wisata</span>
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
                        v-model="formTodo.wisata"
                        :items="paket_wisatas"
                        item-text="nama_wisata"
                        item-value="id"
                        label="Nama Wisata"
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
                        <v-select
                            v-model="formTodo.supir"
                            :items="[`Pakai`, `Tidak`]"
                            label="Supir"
                            required
                        ></v-select>
                        <v-select
                            v-model="formTodo.kendaraan"
                            :items="[`Mobil`, `Bus`]"
                            label="Kendaraan"
                            required
                        ></v-select>

                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                    <v-btn v-if="formTodo.id_update==0" color="blue darken-1" text @click="addOrwis">Save</v-btn>
                    <v-btn v-else color="blue darken-1" text @click="updateOrwis">Save</v-btn>
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
                booking: undefined,
                wisata: undefined,
                status_pembayaran : undefined,
                supir : undefined,
                kendaraan : undefined,
                id_update: 0
            },
            bookings : [],
            paket_wisatas : [],
            search: null,
            dialog: false,
            headers: [
                {
                    text: "No Booking",
                    align: "start",
                    sortable: true,
                    value: "id_booking",
                },
                // {
                //     text: "Nama Wisata",
                //     align: "start",
                //     sortable: true,
                //     value: "id_wisata",
                // },
                { text: "Nama Wisata ", value: "id_wisata" },
                { text: "Status Pembayaran ", value: "status_pembayaran" },
                { text: "Supir", value: "supir" },
                { text: "Kendaraan", value: "kendaraan" },
                { text: "Action", value: "action" },
            ],
            todos:[],
      
            };
        },
        mounted(){
            this.showOrwis();
            this.showPaketWisata();
            this.showBookings();
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
                    wisata: undefined,
                    status_pembayaran : undefined,
                    supir : undefined,
                    kendaraan : undefined,
                    id_update: 0
                };
            },
            tambah(){
                this.dialog=true;
            },
             showOrwis(){
                axios.get('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/reservliburan', {

                })
                    .then((response) => {
                    this.todos = response.data.data
                    this.todos[0].id_booking
                    })
                    .catch((error) => {
                    console.log(error)
                    })
             },
             showPaketWisata(){
                axios.get('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/paketwisata', {

                })
                    .then((response) => {
                    this.paket_wisatas = response.data.data
                    console.log(this.paket_wisatas)
                    })
                    .catch((error) => {
                    console.log(error)
                    })
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
             addOrwis(){
                axios.post('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/reservliburan', {
                    id_booking: this.formTodo.booking.id, // ini nanti dari yang local storage yaww
                    id_wisata: this.formTodo.wisata.id,
                    status_pembayaran:this.formTodo.status_pembayaran == 'Lunas' ? 1 : 0,
                    supir: this.formTodo.supir =='Tidak' ? 1 : 0,
                    kendaraan: this.formTodo.kendaraan == 'Mobil' ? 1 : 0, 
                }, {
                    //ini buayt askese token
                    // headers: {
                    // 'Authorization': `Bearer ${access_token}`
                    // }

                })
                    .then((response) => {
                    console.log(response)
                    this.dialog = false
                    this.showOrwis();
               
                    
                    })
                    .catch((error) => {
                    console.log(error.response.data)
                    })
             },
             editItem(item){
                this.formTodo.id_update = item.id
                this.formTodo.booking = item.id_booking
                this.formTodo.status_pembayaran = item.status_pembayaran == 1 ? 'Lunas' : 'Belum Lunas'
                this.formTodo.supir = item.supir == 1 ? 'Pakai' : 'Tidak'
                this.formTodo.kendaraan = item.kendaraan == 1 ? 'Mobil' : 'Bus'
                this.formTodo.wisata =  this.getNamaWisataObj(item.id_wisata)
                this.dialog=true;
             },
            updateOrwis(){
                axios.put('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/reservliburan/' + this.formTodo.id_update, {
                    id_booking: this.formTodo.booking, // ini nanti dari yang local storage yaww
                    id_wisata: this.formTodo.wisata.id,
                    status_pembayaran:this.formTodo.status_pembayaran == 'Lunas' ? 1 : 0,
                    supir: this.formTodo.supir =='Pakai' ? 1 : 0,
                    kendaraan: this.formTodo.kendaraan == 'Mobil' ? 1 : 0,  
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
                    this.showOrwis();
                    })
                    .catch((error) => {
                    console.log(error.response.data)
                    })
            },
            deleteItem(item){
                axios.delete('https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/reservliburan/' + item.id, {
                    //ini buayt askese token
                    // headers: {
                    // 'Authorization': `Bearer ${access_token}`
                    // }

                })
                    .then((response) => {
                    console.log(response)
                    this.showOrwis();
                    })
                    .catch((error) => {
                    console.log(error.response.data)
                    })
            },

            getNamaWisata(id_wisata){
                let wisata = this.paket_wisatas.find(wisata => wisata.id == id_wisata)
                return wisata.nama_wisata
            },
            getNamaWisataObj(id_wisata){
                let wisata = this.paket_wisatas.find(wisata => wisata.id == id_wisata)
                return wisata
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