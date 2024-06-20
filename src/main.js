import { createApp } from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax3'
// Estilos Vuesax
import 'vuesax3/dist/vuesax.css' 
import './assets/styles/styles.css';

const app = createApp(App)
app.use(Vuesax)
app.mount('#app')
