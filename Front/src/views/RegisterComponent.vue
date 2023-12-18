<template>
    <v-card class="mx-auto pa-8" elevation="8" max-width="500" rounded="lg">
        <div class="text-h6 mb-4">Registro</div>

        <!-- Campos de registro -->
        <v-form @submit.prevent="registerUser">
            <v-text-field v-model="name" label="Nombres" outlined></v-text-field>
            <v-text-field v-model="email" label="Correo Electronico" outlined type="email"></v-text-field>
            <v-text-field v-model="password" label="Nueva Contraseña" outlined type="password"></v-text-field>
            <v-text-field v-model="confirmPassword" label="Confirmar Contraseña" outlined type="password"></v-text-field>

            <!-- Botón de registro -->
            <v-btn type="submit" color="primary">Registrar</v-btn>
        </v-form>
    </v-card>
</template>
  
<script>
// Importa axios
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    },
    methods: {
        registerUser(token) {
            axios.post('/register', {
                name: this.name,
                email: this.email,
                password: this.password,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    // Registro exitoso
                    console.log('Usuario registrado correctamente.');
                    // Limpiar los campos después del registro exitoso
                    this.resetFields();
                })
                .catch(error => {
                    // Manejar errores de registro
                    console.error('Error al registrar usuario:', error);
                });
        },
        resetFields() {
            // Restablecer los valores de los campos después del registro exitoso
            this.name = '';
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
        }
    },
    mounted() {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.registerUser(token);
        } else {
            console.error('Token no está definido.');
            // Aquí puedes manejar cómo quieres manejar la ausencia de un token
        }
    },
};
</script>
