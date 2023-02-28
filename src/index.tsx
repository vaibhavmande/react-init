import 'core-js/stable';
import '@/core/reset.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import RootApp from '@/root-app/RootApp';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import AppProviders from '@/root-app/AppProviders';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppProviders>
        <RootApp />
      </AppProviders>
    </ErrorBoundary>
  </React.StrictMode>
);
