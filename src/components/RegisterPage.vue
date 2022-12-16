<template>
  <main>
    <v-container fluid fill-height class="posisinya">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm6 elevation-6>
          <v-toolbar class="teal lighten-1">
            <v-toolbar-title>
              <h1 class="judul">Register Form</h1>
            </v-toolbar-title>
          </v-toolbar>

          <v-card>
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Name"
                    v-model="name"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Umur"
                    v-model="umur"
                    type="number"
                  ></v-text-field>
                  <v-select label="Gender" :items="['Pria', 'Wanita']" dense>
                  </v-select>
                  <v-text-field label="Alamat" v-model="alamat"></v-text-field>
                  <v-text-model
                    label="Nomor Handphone"
                    v-model="no_hp"
                  ></v-text-model>
                  <v-text-field
                    label="Username"
                    v-model="username"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="E-mail"
                    v-model="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    v-model="password"
                    :value="pass"
                    :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="() => (value = !value)"
                    :type="value ? 'password' : 'text'"
                    required
                  >
                  </v-text-field>
                  <v-select
                    label="Status"
                    :items="['Menikah', 'Tidak Menikah']"
                    dense
                  >
                  </v-select>
                  <v-layout justify-end>
                    <v-btn
                      class="mr-2"
                      @click="submit"
                      :class="{
                        'green darken-1 white--text': valid,
                        disabled: !valid,
                      }"
                      >Go
                    </v-btn>
                    <v-btn @click="clear" class="red darken-3 white--text"
                      >Clear
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="login" class="blue darken-3 white--text"
                      >Login
                    </v-btn>
                  </v-layout>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      load: false,
      valid: false,
      value: String,
    };
  },
  methods: {
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

.posisinya {
  position: absolute;
  top: 20px;
  left: 0px;
  right: 0px;
}

.judul {
  text-align: center;
}
</style>