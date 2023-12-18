import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import RegistroView from '../views/Registro.vue';
import TablaView from '../views/Tabla.vue';
import CarruselView from '../views/Carrusel.vue';
import LoginComponent from '../views/LoginComponent.vue';
import RegisterComponent from '../views/RegisterComponent.vue';
import isAuthenticated from '../router/isAuthenticated'; // Importa la función de verificación de autenticación

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/registro',
      name: 'Registro',
      component: RegistroView,
      meta: { requiresAuth: true }, // Requiere autenticación para acceder a Registro
    },
    {
      path: '/tabla',
      name: 'Tabla',
      component: TablaView,
      meta: { requiresAuth: true }, // Requiere autenticación para acceder a Tabla
    },
    {
      path: '/carrusel',
      name: 'Carrusel',
      component: CarruselView,
      meta: { requiresAuth: true }, // Requiere autenticación para acceder a Carrusel
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginComponent,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterComponent,
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(to, 'hola');
  const token = sessionStorage.getItem('token'); // Obtener el token del localStorage
  console.log(token, 'token');
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
  console.log(requiresAuth, 'variable');
  const isAuthenticated = token;

  if (requiresAuth && !isAuthenticated) {
    //next('/login'); // Redirige a la página de login si intenta acceder a una ruta protegida sin autenticación
  } else {
    next(); // Continuar la navegación normalmente
  }
});

export default router;
