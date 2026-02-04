import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { NuqsAdapter } from 'nuqs/adapters/react';

import App from './App.tsx';

import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we are sure that 'root' element exists
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <App />
    </NuqsAdapter>
  </StrictMode>,
);
