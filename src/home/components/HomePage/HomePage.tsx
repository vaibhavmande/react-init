import React from 'react';
import Page from '@/components/Page/Page';
import MainContent from '@/home/components/MainContent/MainContent';

import './homepage.css';
import FileSelector from '@/home/components/FileSelector/FileSelector';

function HomePage() {
  return (
    <Page title="Home">
      <MainContent />
      <div className="api-section">
        <FileSelector />
      </div>
      <a href="/logout" title="login">
        Logout
      </a>
    </Page>
  );
}

export default HomePage;
