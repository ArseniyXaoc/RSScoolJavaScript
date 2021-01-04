import '../styles/index.scss';
import AppComponent from './components/app/AppComponent';
import DataService from './services/data.service';

const dataService = new DataService();
const app = new AppComponent(dataService);
app.run();
