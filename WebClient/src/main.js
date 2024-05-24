import { createApp } from 'vue'
import App from './App.vue'
import 'flowbite'
import './assets/tailwind.css'
//import BlackDashboard from "./plugins/blackDashboard";
import router from './router'

const app = createApp(App)
app.use(router)
//app.use(BlackDashboard)

app.mount('#app')