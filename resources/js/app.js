require('./bootstrap');
window.Vue = require('vue');

import App from './components/App';
import NavBar from "./components/path/NavBar";
import Index from "./components/pages/posts/Index";

Vue.component('navbar', NavBar);
Vue.component('posts', Index);

const app = new Vue({
    el: '#app',
    render: h => h(App)
});
