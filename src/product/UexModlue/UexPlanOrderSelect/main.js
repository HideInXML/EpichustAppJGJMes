import App from './App.vue'
import Main from '../../../utils/start'
import "muse-ui-loading/dist/muse-ui-loading.css";
import Loading from "muse-ui-loading";
import Progress from 'vue-multiple-progress'

let start = new Main.Start(App)
start.ready(Loading, Progress)

