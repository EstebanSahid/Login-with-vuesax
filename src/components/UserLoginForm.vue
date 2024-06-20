<template>
  <div class="login-container">
    <vs-card class="login-card">
      <form>
        <vs-input 
          v-model="username" 
          label-placeholder="Usuario" 
          class="input-login" />
        <vs-input 
          v-model="password" 
          label-placeholder="Contraseña" 
          type="password" 
          class="input-login" />
        <vs-button type="filled" class="login-button" @click="validarVacios">Login</vs-button>
      </form>
    </vs-card>
  </div>
</template>
  
<script>
  // Importamos axios para consumir los EndPoints
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

      async enviarLogin() {
        try {
          const response = await axios.post('https://perfectosri.software-total.com/api/v1/login/', {
            username: this.username,
            password: this.password
          })
          console.log('Response:', response.data)
        } catch (error) {
          this.$vs.notify({
            title: "Hubo un error al Iniciar Sesión",
            text: error.response.data.message + ', Código: ' + error.response.status + '. Por favor comuniquese con el Administrador',
            color: "danger"
          });
          /*
          console.error('Error Response:', error.response.data);
          console.error('Error Status:', error.response.status);
          console.error('Error Headers:', error.response.headers);
          */
        }
      }

    }
  }
  </script>
  
  <style scoped>
  /*
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .login-card {
    padding: 2rem;
  }
  
  .input-login {
    margin-bottom: 1rem;
  }
  
  .login-button {
    width: 100%;
  }
  */
  </style>
  