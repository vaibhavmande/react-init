import React from 'react';
import { createRoot } from 'react-dom/client';

import RootApp from '@/root-app/RootApp';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<RootApp />);
