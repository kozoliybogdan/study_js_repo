import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/external.css';
import './styles/theme.less';
import './styles/styles.scss';

import './styles/styles.scss';

createRoot(document.getElementById('root')!).render(<App />);