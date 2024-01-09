<template>
  <div class="container-fluid">
    <div class="row no-gutter">

      <div class="col-md-6 d-none d-md-flex bg-image"></div>

      <div class="col-md-6 bg-light">
        <div class="login d-flex align-items-center py-5">

          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">

                <div class="py-4">
                  <v-form ref="login">
                    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">

                      <v-img class="mx-auto mb-10" max-width="228" src="../assets/img/obilet.jpg"></v-img>
                      <v-text-field v-model="username" density="compact" placeholder="Enter your username"
                        prepend-inner-icon="mdi-email-outline" variant="outlined" color="blue-grey darken-2"
                        :rules="reqRules"></v-text-field>

                      <v-text-field v-model="password" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="showPassword ? 'text' : 'password'" :rules="reqRules" density="compact"
                        placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                        @click:append-inner="showPassword = !showPassword" color="blue-grey darken-2"></v-text-field>


                      <!-- <v-combobox class="mt-1" v-model="complex" :items="complexItems" item-title="name" item-value="id"
                        variant="outlined" density="compact"></v-combobox> -->

                      <v-checkbox label="Remember me" color="teal-darken-4" value="rememberme" hide-details></v-checkbox>

                      <v-btn :disabled="waitingDialog" :loading="waitingDialog" block class="mb-8" rounded="pill"
                        color="#d23b38" @click="signin()">
                        SIGN IN
                      </v-btn>

                    </v-card>
                  </v-form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <v-dialog v-model="waitingDialog" :scrim="true" persistent width="auto" no-click-animation :style="{ zIndex: 1 }">
    <v-card color="light-blue-darken-4">
      <v-card-text>
        Your info is controlling right now. Please wait for controlling.
        <div class="text-center mt-3 mb-1">
          <v-progress-circular :size="50" color="light-blue-lighten-5" indeterminate></v-progress-circular>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
//importing bootstrap 5 Modules
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import auth from "@/api/auth";
// import auth from "../api/auth.js"
import axios from 'axios'
import CRUD from "@/api/CrudOperation/CRUD.js"
let t = 0;
export default {
  data() {
    return {
      loginRules: [
        (v) => !!v || "Please enter your e-mail address.",
        (v) => /.+@.+\..+/.test(v) || "Please enter a valid email address",
      ],
      passwordRules: [(v) => !!v || "Please enter your password."],
      reqRules: [(v) => !!v || "Required field."],
      compRules: [(v) => v.id != 0 || "Required field."],
      showPassword: false,
      waitingDialog: false,
      password: null,
      username: null,
    };
  },
  emits: ["login"],
  // props: {
  //     getLoginBool: Boolean
  // },
  methods: {
    async signin() {
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      const validControl = await this.$refs.login.validate();
      if (validControl.valid) {
        this.waitingDialog = true
        localStorage.clear()
        var data = {
          Type: 1,
          Connection: {
            IpAddress: "165.114.41.21",
            Port: "5117"
          },
          Browser: {
            Name: "browser",
            Version: "47.0.0.12"
          },
          Application: {
            Version: "1.0.0.0",
            EquipmentId: "distribusion"
          }
        }

        const response = await CRUD.PostData(auth.GetSessionUrl, data)
        console.log(response.data.data.Status)
        var a = null
        if (response.status == '200') {
          const datas = response.data.data.data
          console.log(datas.sessionId)
          localStorage.setItem('sessionId', datas.sessionId)
          localStorage.setItem('deviceId', datas.deviceId)

          this.$emit("login")
        }
        else {
          this.$root.SnackBarS.show({
            successMsg: response.data.Message,
            color: "red"
          })
        }
        this.waitingDialog = false
        // axios
        //   .post(auth.GetSessionUrl, data , {
        //     // headers: {
        //     //   // "X-YPH-COMPLEX": this.complex.id
        //     // }
        //   }
        //   )
        //   .then((response) => {
        //     this.response = response
        //     if (response.data.ResponseCode == 'Success') {
        //       const datas = response.data.Data
        //       localStorage.setItem('sessionId', datas.sessionId)
        //       localStorage.setItem('deviceId', datas.deviceId)

        //       this.$emit("login")
        //     }
        //     else {
        //       this.$root.SnackBarS.show({
        //         successMsg: response.data.Message,
        //         color: "red"
        //       })
        //     }
        //     this.waitingDialog = false
        //   })
        //   .catch((error) => {
        //     this.response = error
        //     console.log(error)
        //     this.$root.SnackBarS.show({
        //       successMsg: "Server is not responding.",
        //       color: "red"
        //     })
        //     this.waitingDialog = false
        //   });
      }
    },
  },
}



</script>