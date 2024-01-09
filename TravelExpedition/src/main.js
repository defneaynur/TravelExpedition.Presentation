// import 'devextreme/dist/css/dx.material.blue.dark.css';
 import 'devextreme/dist/css/dx.material.teal.light.compact.css';
// import 'devextreme/dist/css/dx.light.css';
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'sweetalert2/dist/sweetalert2.min.css';

import router from './router' 
import VueSweetalert2 from 'vue-sweetalert2';
// import { JsonServiceClient } from '@servicestack/client';
// import { JsonApiClient } from '@servicestack/client';



let app = createApp(App)
// global variables
// app.config.globalProperties.$isLogin = false 
// const client = new JsonServiceClient();


loadFonts()

app
  .use(vuetify)
  .use(router)
  // .provide('client', client)
  .use(VueSweetalert2)
  .mount('#app')
