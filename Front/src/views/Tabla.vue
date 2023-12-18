<template>
    <v-container>
        <v-data-table :headers="headers" :items="desserts" sort-by="nombre" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Lista de Contacto</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" dark class="mb-2" v-bind="props">
                                New Item
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.apellido" label="Apellido"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.correo" label="Correo"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.telefono" label="Telefono"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.celular" label="Celular"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.direccion" label="Direccion"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.genero" label="Genero"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="close">
                                    Cancelar
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="editarContacto(editedItem)">
                                    Modificar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="me-2" @click="editItem(item._id)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="elinimarContacto(item._id)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: 'ID del Contacto', value: '_id' },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Apellido', value: 'apellido' },
                { text: 'Correo', value: 'correo' },
                { text: 'Telefono', value: 'telefono' },
                { text: 'Celular', value: 'celular' },
                { text: 'Direccion', value: 'direccion' },
                { text: 'Genero', value: 'genero' },
                { text: 'Acciones', value: 'actions', sortable: false },
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: [],
            defaultItem: {

            },
        };
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
        this.listarContacto()
    },

    methods: {
        initialize() {

        },

        editItem(item) {
            this.dialog = true
            console.log(item);
            this.axios.get(`/buscarParametro/${item}`)
                .then(res => {
                    this.editedItem = res.data;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },

        listarContacto() {
            const token = sessionStorage.getItem("token")
            this.axios.get('/buscarTodo', {
                headers: {
                    authorization: token,
                }
            })
                .then((response) => {
                    this.desserts = response.data;
                })
                .catch((e) => {
                    console.log('Error' + e);
                })
        },
        editarContacto(item) {
            const token = sessionStorage.getItem("token");

            this.axios.put(`/actualizar/${item._id}`, item, {
                headers: {
                    authorization: token,
                }
            })
                .then(res => {
                    this.$swal('Success!',
                        'Contacto Modificado Exitosamente!',
                        'success');
                    this.close();
                    const index = this.desserts.findIndex(n => n._id === res.data._id)
                    this.desserts[index].nombre = res.data.nombre;
                    this.desserts[index].apellido = res.data.apellido;
                    this.desserts[index].correo = res.data.correo;
                    this.desserts[index].telefono = res.data.telfono;
                    this.desserts[index].celular = res.data.celular;
                    this.desserts[index].direccion = res.data.direccion;
                    this.desserts[index].genero = res.data.genero;
                })
                .catch((e) => {
                    console.log('Error' + e);
                })
        },
        elinimarContacto(id) {
            const token = sessionStorage.getItem("token");

            console.log(id);
            this.axios.delete(`/eliminarParametro/${id}`, {
                headers: {
                    authorization: token,
                }
            })
                .then(res => {
                    this.$swal('Ok!',
                        'Contacto Eliminado Exitosamente!',
                        'error');
                    const index = this.desserts.findIndex(item => item._id === res.data._id)
                    this.desserts.splice(index, 1);
                    this.editedIndex = this.desserts.indexOf(item);
                    this.editedIndex = Object.assign({}, item)
                })
                .catch((e) => {
                    console.log(e.response);
                })
        }
    },
}
</script>


