<template>
	<div id="app">
		<div id="login">
			<div id="description">
				<h2>WELCOME</h2>
				<v-img :src="logo" aspect-ratio="1"></v-img>
				<p>
					Don't have an account yet ? Click here to
					<a @click="register"><u><i style="color: blue">Register</i></u></a>
				</p>
			</div>
			<div id="form">

				<v-form>
				
					<v-text-field 
						label="Email" 
						v-model="email" 
						type="text" 
						placeholder="@gmail.com"
						required>
					</v-text-field>
				
					<v-text-field 
						label="Password" 
						v-model="password" 
						type="password" 
						placeholder="********"
						required>
					</v-text-field>
				
					<v-btn 
						@click="loginFunction()">
						Log in
					</v-btn>
				</v-form>
			</div>
		</div>
		<v-snackbar v-model="snackbar" :color="statusColor" timeout="2000" bottom>
			{{ error_message }}
		</v-snackbar>
		<v-snackbar v-model="berhasil" color="green lighten-2" timeout="2000" bottom>
			Email Verification Success
		</v-snackbar>
	</div>
</template>

<script>

import axios from "axios";

	let baseAPI = "http://127.0.0.1:8000/api/";

export default {

	

	name: "LoginPage",
	components: {
		// Something
	},
	data() {
		return {
			logo: require("../assets/mini.png"),
			load: false,
			valid: false,
			snackbar: false,
			error_message: "",
			statusColor: "",
			email: "",
			password: "",
			berhasil: null,
		};
	},
	methods: {

		loginFunction() {

			console.log("sudah masuk");

			this.load = true;
			
			let sendObject = {
				email : this.email,
				password : this.password,
			};

			console.log(sendObject);

			axios.post(baseAPI + "login", sendObject)

				.then((response) => {

					console.log(response);
	

					// localStorage.setItem("id", response.data.user.id);
					// localStorage.setItem("tokenLogin", response.data.access_token);

					
					console.log(response);
					
					
					console.log("object send");
					console.log(sendObject);
					
					//setelah login ditampilkan pesan di snackbar
					this.error_message = response.data.message;
					this.statusColor = "green";
					this.snackbar = true;
					this.load = false;



					this.$router.push({ name: "Root" });
				})

				.catch((error) => {

					console.log(error)

					this.statusColor = "red";
					this.snackbar = true;

					localStorage.removeItem("tokenLogin");

					console.log("gagal");
					
					this.load = false;
				});

		},

		register() {
			this.$router.push({
				name: "Register",
			});
		},
		veriviedStatus() {
			if (this.$route.query.verified == "success") {
				this.berhasil = true;
				this.$router.push("/login");
			}
		},
	},
	mounted() {
		// this.veriviedStatus();
	},
};
</script>

<style>
* {
	box-sizing: border-box;
	font-family: Verdana, sans-serif;
}

html,
body {
	height: 100%;
	margin: 0;
	padding: 0;
	width: 100%;
}

div#app {
	width: 100%;
	height: 100%;
}

div#app div#login {
	align-items: center;
	background-color: teal;
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
}

div#app div#login div#description {
	background-color: #ffffff;
	width: 280px;
	padding: 35px;
}

div#app div#login div#description h2 {
	text-align: center;
}

div#app div#login div#description v-img,
div#app div#login div#description p {
	margin: 0;
}

div#app div#login div#description p {
	font-size: 0.8em;
	color: #95a5a6;
	margin-top: 10px;
}

div#app div#login div#form {
	background-color: #34495e;
	border-radius: 5px;
	box-shadow: 0px 0px 30px 0px #666;
	color: #ecf0f1;
	width: 260px;
	padding: 35px;
}

div#app div#login div#form label,
div#app div#login div#form input {
	outline: none;
	width: 100%;
}

div#app div#login div#form label {
	color: #95a5a6;
	font-size: 0.8em;
}

div#app div#login div#form input {
	background-color: transparent;
	border: none;
	color: #ecf0f1;
	font-size: 1em;
	margin-bottom: 20px;
}

div#app div#login div#form ::placeholder {
	color: #ecf0f1;
	opacity: 1;
}

div#app div#login div#form button {
	color: black;
	background-color: white;
	cursor: pointer;
	border: none;
	border-radius: 5px;
	margin-top: 5px;
	padding: 10px;
	transition: background-color 0.2s ease-in-out;
	width: 100%;
}

div#app div#login div#form button:hover {
	color: white;
	background-color: black;
}

@media screen and (max-width: 600px) {
	div#app div#login {
		align-items: unset;
		background-color: unset;
		display: unset;
		justify-content: unset;
	}

	div#app div#login div#description {
		margin: 0 auto;
		max-width: 350px;
		width: 100%;
	}

	div#app div#login div#form {
		border-radius: unset;
		box-shadow: unset;
		width: 100%;
	}

	div#app div#login div#form form {
		margin: 0 auto;
		max-width: 280px;
		width: 100%;
	}
}
</style>