<template>
  <div class="container">
    <vs-card>
      <!-- Imagen de Login -->
      <vs-row vs-justify="center" vs-align="center">
        <vs-col vs-w="4" vs-type="flex" vs-justify="center" vs-align="center" >
          <img src="/img-login/login.png" alt="Imagen de Login">
        </vs-col>
      </vs-row>
      
      <!-- Formulario -->
      <form>
        <vs-row vs-w="12">
          <vs-col vs-w="4" vs-offset="4" >
            <!-- Input para el Usuario -->
            <vs-row vs-justify="center" vs-align="center">
              <vs-col vs-w="6" vs-type="flex" vs-justify="center" vs-align="center">
                <vs-input v-model="username" label-placeholder="Ingrese el usuario" />
              </vs-col>
              <!-- Input para la Contraseña -->
              <vs-col vs-w="6" vs-type="flex" vs-justify="center" vs-align="center">
                <vs-input v-model="password" label-placeholder="Ingrese la contraseña" type="password" />
              </vs-col>
            </vs-row>
            
            <!-- Enviar el Formulario -->
            <vs-row vs-justify="center" vs-align="center">
              <vs-col vs-w="12" vs-type="flex" vs-justify="center" vs-align="center" >
                <vs-button type="filled" class="login-button" @click="validarVacios">
                  Login
                </vs-button>
              </vs-col>
            </vs-row>
          </vs-col>
        </vs-row>
      </form>
    </vs-card>
  </div>
</template>
  
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      validarVacios() {
        if (this.username == '' || this.password == '') {
          this.$vs.notify({
            title: "Campos Vacios",
            text: "Por favor ingrese el usuario y/o contraseña",
            color: "danger"
          })
        } else {
          this.enviarLogin();
        }
      },

      asignarLocalStorage(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('forzar', data.forzar);
      },

      async enviarLogin() {
        try {
          const response = await axios.post('https://perfectosri.software-total.com/api/v1/login/', {
            username: this.username,
            password: this.password
          });

          console.log('Response:', response.data);
          this.asignarLocalStorage(response.data);

        } catch (error) {
          this.$vs.notify({
            title: "Error al Iniciar Sesión",
            text: error.response.data.message + ', Código: ' + error.response.status + '. Por favor comuniquese con el Administrador',
            color: "danger"
          });
          
          console.error('Error Response:', error.response.data);
          console.error('Error Status:', error.response.status);
          console.error('Error Headers:', error.response.headers);
          
        }
      }
    }
  }
  </script>
  
  <style scoped>
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-image: url('./../../public/img-login/background-login.jpg');
      background-size: cover;
      background-position: center; 
    }
    
    .login-button {
      margin-top: 15px;
      width: 100%; 
    }
  </style>
  