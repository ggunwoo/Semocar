import App from './App';
import './index.css';
import './fonts/fonts.css'
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import {Provider} from 'react-redux'
// import store from './store/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
