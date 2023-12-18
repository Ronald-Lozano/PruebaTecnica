<template>
    <v-card class="overflow-hidden">
        <v-app-bar color="#6A76AB" dark shrink-on-scroll prominent src="https://picsum.photo/1920/1080?random"
            fade-img-on-scroll scroll target="#scrolling-techniques-3">

            <template v-slot:img="{ props }">
                <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
            </template>

            <router-link to="/" style="text-decoration: none; color: inherit; flex: 1;">
                <div style="margin: 50px -1000px 50px 25px; cursor: pointer; text-align: center; font-size: 80px;">Libreta de Contacto</div>
            </router-link>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <div>
                <v-btn icon @click="showDialog = true">
                    <v-icon>mdi-account</v-icon>
                </v-btn>

                <v-dialog v-model="showDialog" max-width="500px">
                    <v-card>
                        <v-card-title>
                            Iniciar Sesión
                            <v-spacer></v-spacer>
                            <v-btn icon @click="showDialog = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-text>
                            <login-component @login="handleLogin" />
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </div>

            <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <template v-slot:extension>
                <v-tabs aling-with-title>
                    <v-tab @click="llamarRegistro()">Registra Contacto</v-tab>
                    <v-tab @click="llamarTabla()">Lista de Contacto</v-tab>
                    <v-tab @click="llamarCarrusel()">Carrusel</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>
        <v-sheet id="scrolling-techniques-3" class="overflow-y-auto" max-height="600">
        </v-sheet>
    </v-card>
</template>

<script>
import LoginComponent from '@/views/LoginComponent.vue'
export default {
    components: {
        LoginComponent,
    },
    data() {
        return {
            showDialog: false,
        };
    },

    methods: {

        llamarRegistro() {
            this.$router.push('/registro')
        },
        llamarTabla() {
            this.$router.push('/tabla')
        },
        llamarCarrusel() {
            this.$router.push('/carrusel')
        },
        handleLogin(userData) {
            // Lógica para manejar el inicio de sesión
            // userData contendrá los datos del login
            // Ejemplo:
            // Realizar una llamada a la API para autenticar el usuario
        },
    }
}
</script>