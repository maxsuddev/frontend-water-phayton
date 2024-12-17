import './assets/main.css'

import './../public/assets/vendor/apexcharts/apexcharts.min.js';
import './../public/assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
import './../public/assets/vendor/chart.js/chart.umd.js';
import './../public/assets/vendor/echarts/echarts.min.js';
import './../public/assets/vendor/quill/quill.js';
import './../public/assets/vendor/simple-datatables/simple-datatables.js';
import './../public/assets/vendor/tinymce/tinymce.min.js';
import './../public/assets/vendor/php-email-form/validate.js';


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store/index.js";

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
});


const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')

