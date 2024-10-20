import App from '@app/App';
import store from '@app/store';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
