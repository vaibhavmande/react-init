import React, { useEffect } from 'react';
import { DEFAULT_PAGE_TITLE } from '@/core/utils/page.constants';

import './page.css';

interface PageProps {
  title?: string;
  children: React.ReactNode;
}

function Page({ title, children }: PageProps) {
  useEffect(() => {
    document.title = title ?? DEFAULT_PAGE_TITLE;
  }, [title]);

  return (
    <>
      <header>
        <ul>
          <li>
            <h1>
              <a
                href="https://github.com/vaibhavmande/react-init"
                title="source code"
                target="_blank"
                rel="noreferrer"
              >
                react-init
              </a>
            </h1>
          </li>
          <li>Environment: {TARGET_ENV}</li>
          <li>Service URL: {SERVICE_URL}</li>
        </ul>
      </header>
      <main
        style={{
          margin: 'auto',
          maxWidth: '50rem',
          display: 'grid',
          gap: '2rem',
          paddingTop: '1rem',
        }}
      >
        {children}
      </main>
    </>
  );
}

export default Page;
