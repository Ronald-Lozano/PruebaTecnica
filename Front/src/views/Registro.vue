<template>
    <v-container>
        <v-form @submit.prevent="agregarContacto()">

            <v-text-field v-model="atributos.nombre" :counter="30" label="Nombres"></v-text-field>

            <v-text-field v-model="atributos.apellido" :counter="30" label="Apellidos"></v-text-field>

            <v-text-field v-model="atributos.correo" label="Correo"></v-text-field>

            <v-text-field v-model="atributos.telefono" label="Telefono"></v-text-field>

            <v-text-field v-model="atributos.celular" label="Celular"></v-text-field>

            <v-text-field v-model="atributos.direccion" label="Direccion"></v-text-field>

            <v-select v-model="atributos.genero" :items="generO" label="Generos"></v-select>

            <v-btn color="success" class="mt-4" type="submit">
                Enviar Registro
            </v-btn>

            <v-btn color="error" class="mt-4">
                Limpiar Los Campos
            </v-btn>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            Atributos: [],
            atributos: {
                nombre: "",
                apellido: "",
                telefono: "",
                celular: "",
                direccion: "",
                genero: "",
                correo: "",
            },
            generO: ['Masculino', 'Femenio', 'Prefiero No Decirlo']
        }
    },
    methods: {
        agregarContacto() {
            console.log(this.atributos);
            if (!this.atributos.nombre) {
                this.$swal('Error!',
                    'Falta Nombre de Contacto!',
                    'error');
            } else if (!this.atributos.apellido) {
                this.$swal('Error!',
                    'Falta Apellido del Contacto!',
                    'error');
            } else if (!this.atributos.genero) {
                this.$swal('Error!',
                    'Falta Genero del Contacto!',
                    'error');
            } else if (!this.atributos.telefono) {
                this.$swal('Error!',
                    'Falta Telefono del Contacto!',
                    'error');
            } else if (!this.atributos.celular) {
                this.$swal('Error!',
                    'Falta Celular del Contacto!',
                    'error');
            } else if (!this.atributos.direccion) {
                this.$swal('Error!',
                    'Falta Direccion del Contacto!',
                    'error');
            } else {
                const token = sessionStorage.getItem("token")
                this.axios
                    .post("/nuevo-registro", this.atributos, {
                        headers: {
                            authorization: token,
                        }
                    })
                    .then((res) => {
                        if (!this.atributos.nombre) {
                            this.$swal('Success!',
                                'Contacto Agregado Exitosamente!',
                                'success');
                        }
                        this.Atributos.push(res.data);
                        this.atributos.nombre = "";
                        this.atributos.apellido = "";
                        this.atributos.correo = "";
                        this.atributos.telefono = "";
                        this.atributos.celular = "";
                        this.atributos.direccion = "";
                        this.atributos.genero = "";
                    })
                    .catch((e) => {
                        console.log(e.response);
                        alert("Error en guardar registro");
                    })
            }
        }

    }
}


</script>