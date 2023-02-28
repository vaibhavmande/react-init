import React from 'react';

import { UnauthenticatedAppRoutes } from '@/core/routes/AuthenticatedAppRoutes';

function UnauthenticatedApp() {
  return (
    <main>
      <UnauthenticatedAppRoutes />
    </main>
  );
}

export default UnauthenticatedApp;
