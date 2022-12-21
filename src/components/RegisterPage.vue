<template>
  <div id="app">
    <div id="regis">
      <v-container fluid fill-height class="position">
        <v-layout flex align-center justify-center>
          <v-flex xs12 sm6 elevation-6>
            <v-toolbar class="teal lighten-1">
              <v-spacer />
              <v-toolbar-title>
                <h1><b>REGISTRATION</b></h1>
              </v-toolbar-title>
              <v-spacer />
            </v-toolbar>

            <v-card>
              <v-card-text class="pt-2">
                <div>
                  <v-form v-model="valid" ref="form">
                    <v-text-field
                      label="Nama"
                      v-model="nama"
                      required
                      solo
                    ></v-text-field>
                    <v-text-field
                      label="Umur"
                      v-model="umur"
                      type="number"
                      required
                      solo
                    ></v-text-field>
                    <div class="form-group mb-6">
                      <select class="form-select" v-model="gender">
                        <option value="" selected disabled>Gender</option>
                        <option value="1">Pria</option>
                        <option value="0">Wanita</option>
                      </select>
                    </div>
                    <v-text-field
                      label="Alamat"
                      v-model="alamat"
                      required
                      solo
                    ></v-text-field>
                    <v-text-field
                      label="Nomor Handphone"
                      v-model="no_hp"
                      required
                      solo
                    ></v-text-field>
                    <v-text-field
                      label="Username"
                      v-model="username"
                      required
                      solo
                    ></v-text-field>
                    <v-text-field
                      label="Email"
                      v-model="email"
                      required
                      solo
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      v-model="password"
                      :append-icon="valueEye ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="() => (valueEye = !valueEye)"
                      :type="valueEye ? 'password' : 'text'"
                      :rules="[(v) => !!v || 'Password harus diisi']"
                      required
                      solo
                    >
                    </v-text-field>
                    <div class="form-group mb-6">
                      <select class="form-select" v-model="status">
                        <option value="" selected disabled>Status</option>
                        <option value="1">Menikah</option>
                        <option value="0">Tidak Menikah</option>
                      </select>
                    </div>
                    <v-layout justify-end>
                      <v-btn
                        @click="clear"
                        class="red darken-3 white--text mt-2"
                        >Clear
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        @click="submit"
                        class="blue darken-3 white--text mt-2"
                        >Submit
                      </v-btn>
                    </v-layout>
                  </v-form>
                </div>
              </v-card-text>
            </v-card>
            <v-snackbar
              v-model="snackbar"
              :color="statusColor"
              timeout="2000"
              bottom
            >
              {{ error_message }}
            </v-snackbar>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>


<script>

import axios from 'axios';
export default {
  name: "RegisterPage",
  data() {
    return {
      valueEye: String,
      load: false,
      valid: false,
      snackbar: false,
      error_message: "",
      statusColor: "",
      nama: "",
      umur: "",
      gender: "",
      alamat: "",
      no_hp: "",
      username: "",
      email: "",
      password: "",
      status: "",
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        alert("masuk bos")
        this.load = true;

        let nama = this.nama
        let umur = this.umur
        let gender = this.gender
        let alamat = this.alamat
        let no_hp = this.no_hp
        let username = this.username
        let email = this.email
        let password = this.password
        let status = this.status

        alert(nama);


        axios.post("https://frederikus.com/UAS_Hotel_B_Kel-A/public/api/register", {
            nama: nama,
            umur: umur,
            gender: gender,
            alamat: alamat,
            no_hp: no_hp,
            username: username,
            email: email,
            password: password,
            status: status,
          })
          .then((response) => {
            this.error_message = response;
            console.log(response);
            this.statusColor = "green";
            this.snackbar = true;
            this.load = false;
            alert("masuk tresponse")
            this.$router.push({
              name: "Login",
            });
          })
          .catch((error) => {
            console.log(error.response.data)
            alert("masuk error")
            this.statusColor = "red";
            this.snackbar = true;

            this.load = false;
          });
      }
    },
    login() {
      this.$router.push({
        name: "Login",
      });
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
.grey--text {
  font-family: "Jolly Lodger";
}

div#app {
  width: 100%;
  height: 100%;
  background-color: white;
}

div#app div#regis {
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 0px;
  right: 0px;
}
</style>