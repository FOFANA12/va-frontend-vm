// Global styles
import './assets/css/main.css';
import 'vue-loading-overlay/dist/css/index.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-select/dist/vue-select.css';
import "@/assets/css/vue-select.css";
import 'flag-icons/css/flag-icons.min.css';

// Core Vue imports and plugins
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { HasError } from 'vform/src/components/tailwind';
import i18n from '@/i18n';
import router from '@/router';

// Global components
import App from './App.vue';
import CustomModal from '@/components/ui/CustomModal.vue';
import SubmitButton from '@/components/ui/SubmitButton.vue';
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue';
import FetchError from '@/components/ui/FetchError.vue';
import SkeletonLoader from '@/components/ui/SkeletonLoader.vue';
import Alert from '@/components/ui/Alert.vue';
import Loader from 'vue-loading-overlay';
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue';
import vSelect from 'vue-select'
import DataTable from '@/components/ui/DataTable.vue';
import DatatableSearchInput from '@/components/ui/DatatableSearchInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseLinkButton from '@/components/ui/BaseLinkButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseDatePicker from '@/components/ui/BaseDatePicker.vue';
import BaseInputReadonly from '@/components/ui/BaseInputReadonly.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';
import BaseTextareaReadonly from '@/components/ui/BaseTextareaReadonly.vue';
import SingleSelect from '@/components/ui/SingleSelect.vue';
import MultiSelect from '@/components/ui/MultiSelect.vue';
import StatusField from '@/components/ui/StatusField.vue';


// Store imports
import { useAuthStore, useLoaderStore } from '@/store';

// Create the Vue application instance
const app = createApp(App);

// Install Pinia (state management)
const pinia = createPinia();
app.use(pinia);

// Install i18n (internationalization)
app.use(i18n);
app.config.globalProperties.t = i18n.global.t;

// Register global components
app.component('SubmitButton', SubmitButton);
app.component('Loader', Loader);
app.component('Breadcrumbs', Breadcrumbs);
app.component('CustomModal', CustomModal);
app.component('Alert', Alert);
app.component('DefaultLayout', DefaultLayout);
app.component('FullScreenLayout', FullScreenLayout);
app.component('FetchError', FetchError);
app.component('SkeletonLoader', SkeletonLoader);
app.component('v-select', vSelect)
app.component('DataTable', DataTable)
app.component('DatatableSearchInput', DatatableSearchInput)
app.component('LinkButton', BaseLinkButton)
app.component('Button', BaseButton)
app.component('Input', BaseInput)
app.component('DatePicker', BaseDatePicker)
app.component('InputReadonly', BaseInputReadonly)
app.component('Textarea', BaseTextarea)
app.component('TextareaReadonly', BaseTextareaReadonly)
app.component('SingleSelect', SingleSelect);
app.component('MultiSelect', MultiSelect);
app.component('StatusField', StatusField);
app.component(HasError.name, HasError);

// Load authenticated user profile before mounting the app
// const store = useAuthStore();
// const loaderStore = useLoaderStore();

// store.checkUser().finally(() => {
//   loaderStore.appInitializing = false;
//   app.use(router);
//   app.mount('#app');
// });

// loaderStore.appInitializing = false;
app.use(router);
app.mount('#app');
