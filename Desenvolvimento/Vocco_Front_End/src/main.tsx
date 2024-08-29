import React from 'react';
import GlobalStyle from './styles/globalStyles';
import ReactDOM from 'react-dom/client';
import App from './app';
import { AuthProvider } from './contexts/auth';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <React.StrictMode>
            <I18nextProvider i18n={i18n}>
                <GlobalStyle />
                < App />
            </I18nextProvider>
        </React.StrictMode>
    </AuthProvider>
);
