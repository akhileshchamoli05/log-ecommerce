import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { ShopContextProvider } from './store/shop-context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ShopContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ShopContextProvider>
  </AuthContextProvider>
);
