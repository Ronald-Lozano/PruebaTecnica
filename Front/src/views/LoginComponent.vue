<template>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div v-if="!authenticated">
            <!-- Campos de entrada para correo electrónico y contraseña -->
            <v-text-field v-model="email" density="compact" placeholder="Correo Electronico"
                prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

            <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                v-model="password" density="compact" placeholder="Ingresa Tu Contraseña" prepend-inner-icon="mdi-lock-outline"
                variant="outlined" @click:append-inner="visible = !visible"></v-text-field>

            <!-- Botón de inicio de sesión -->
            <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="performLogin">
                Acceso
            </v-btn>

            <!-- Texto para registro -->
            <v-card-text class="text-center">
                <!-- Botón para abrir el diálogo de registro -->
                <v-btn text class="text-blue" @click="openRegisterDialog">
                    Regístrate ahora <v-icon icon="mdi-chevron-right"></v-icon>
                </v-btn>
            </v-card-text>
        </div>

        <!-- Si ya está autenticado -->
        <div v-show="authenticated">
            <p>¡Ya estás autenticado!</p>
            <!-- Botón de log out -->
            <v-btn block class="mb-8" color="red" size="large" variant="tonal" @click="logout">
                Cerrar sesión
            </v-btn>
        </div>

        <!-- Diálogo de registro -->
        <v-dialog v-model="showRegisterDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Registro</span>
                    <v-btn icon @click="closeRegisterDialog">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <RegisterComponent /> <!-- Renderiza el componente de registro aquí -->
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>
</template>
  
<script>
import RegisterComponent from './RegisterComponent.vue';
import axios from 'axios';

export default {
    components: {
        RegisterComponent,
    },
    data() {
        return {
            visible: false,
            email: '',
            password: '',
            authenticated: sessionStorage.getItem('token'),
            showRegisterDialog: false,
        };
    },
    methods: {
        performLogin() {
            axios.post('/login', {
                email: this.email,
                password: this.password,
            })
                .then(response => {
                    if (response.status === 200) {
                        this.authenticated = true;
                        console.log(response.data, 'string');
                        sessionStorage.setItem('token', response.data.token);
                        console.log('Login exitoso.');
                        // Limpiar los campos del formulario después del login exitoso
                        this.email = '';
                        this.password = '';
                    } else {
                        this.clearForm(); // Limpiar los campos del formulario en caso de error
                        const alertError = response.data?.message ?? "Error desconocido, por favor intenta nuevamente";
                        alert(alertError);
                    }
                })
                .catch(error => {
                    console.error('Error al realizar login:', error);
                    this.clearForm(); // Limpiar los campos del formulario en caso de error
                    const alertError = error?.response?.data?.message ?? "Error desconocido, por favor intenta nuevamente";
                    alert(alertError);
                });
        },
        clearForm() {
            // Método para limpiar los campos del formulario
            this.email = '';
            this.password = '';
        },
        logout() {
            this.authenticated = false;
            sessionStorage.clear();
            this.$router.push('/login');
            // Aquí podrías emitir un evento EventBus para el logout si es necesario
        },
        openRegisterDialog() {
            this.showRegisterDialog = true;
        },
        closeRegisterDialog() {
            this.showRegisterDialog = false;
        },
    },
};
</script>
  