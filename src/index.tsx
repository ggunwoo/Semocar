import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import {Provider} from 'react-redux'
// import store from './store/store'
import CssBaseLine from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    // <Provider store={store}>
      <BrowserRouter>
        <CssBaseLine />
        <App />
      </BrowserRouter>
    // </Provider>
  // </React.StrictMode>
);

reportWebVitals();
