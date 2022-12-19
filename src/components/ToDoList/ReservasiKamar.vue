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
                    <v-list-item-title class="headline">Reservasi Kamar</v-list-item-title>
                <v-list-item-subtitle >---A Hotel---</v-list-item-subtitle>
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
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Pesan Kamar</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <!-- <v-select
                            v-model="formTodo.tipeKamar"
                            :items="['Deluxe', 'Standar' , 'Semi-Standar']"
                            label = "TipeKamar"
                            required>
                        </v-select> -->

                        <v-select
                        v-model="formTodo.kamar"
                        :items="kamars"
                        item-text="tipe_kamar"
                        item-value="id"
                        label="Select"
                        persistent-hint
                        return-object
                        single-line
                        ></v-select>

                        <v-text-field
                            v-model="formTodo.lama_menginap"
                            label="LamaInap"
                            required>
                        </v-text-field>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                    <v-btn v-if="formTodo.id_update==0" color="blue darken-1" text @click="addBookings">Save</v-btn>
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
                kamar: undefined,
                lama_menginap : undefined,
                id_update: 0
            },
            kamars : [],
            search: null,
            dialog: false,
            headers: [
                {
                    text: "Tipe Kamar",
                    align: "start",
                    sortable: true,
                    value: "id_kamar",
                },
                { text: "Lama Inap", value: "lama_menginap" },
                { text: "Action", value: "action" },
            ],
            todos:[],
      
            };
        },
        mounted(){
            
                this.showBookings();
                this.showKamar();

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
                    kamar: undefined,
                    lama_menginap : undefined,
                    id_update: 0
                };
            },
            tambah(){
                this.dialog=true;
            },
            showKamar(){
                axios.get('http://localhost:8000/api/kamars', {

                })
                    .then((response) => {
                    this.kamars = response.data.data
                    console.log(this.kamars)
                    })
                    .catch((error) => {
                    console.log(error)
                    })
             },
             showBookings(){
                axios.get('http://localhost:8000/api/bookings', {

                })
                    .then((response) => {
                    this.todos = response.data.data
                    
                    })
                    .catch((error) => {
                    console.log(error)
                    })
             },
             addBookings(){
                axios.post('http://localhost:8000/api/bookings', {
                    id_user: 1, // ini nanti dari yang local storage yaww
                    id_kamar: this.formTodo.kamar.id,
                    lama_menginap: this.formTodo.lama_menginap,
                    status_pembayaran: 1,
                    stat_cekInOrOut: 1,  
                    id_karyawan: 1
                }, {
                    //ini buayt askese token
                    // headers: {
                    // 'Authorization': `Bearer ${access_token}`
                    // }

                })
                    .then((response) => {
                    console.log(response)
                    this.dialog = false
                    this.showBookings();
                    })
                    .catch((error) => {
                    console.log(error.response.data)
                    })
             },
             editItem(item){
                this.formTodo.id_update = item.id
                this.formTodo.lama_menginap = item.lama_menginap
                this.dialog=true;
             },
            updateBookings(){
                axios.put('http://localhost:8000/api/bookings/' + this.formTodo.id_update, {
                    id_user: 1, // ini nanti dari yang local storage yaww
                    id_kamar: this.formTodo.kamar.id,
                    lama_menginap: this.formTodo.lama_menginap,
                    status_pembayaran: 1,
                    stat_cekInOrOut: 1,  
                    id_karyawan: 1
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
                    this.showBookings();
                    })
                    .catch((error) => {
                    console.log(error.response.data)
                    })
            },
            deleteItem(item){
                axios.delete('http://localhost:8000/api/bookings/' + item.id, {
                    //ini buayt askese token
                    // headers: {
                    // 'Authorization': `Bearer ${access_token}`
                    // }

                })
                    .then((response) => {
                    console.log(response)
                    this.showBookings();
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