import React from 'react';

function AppInfoCard() {
  return (
    <div>
      <p style={{ lineHeight: '1.8rem' }}>
        This is a Azure static web app which demonstrates Authentication. Run with swa(
        <a
          href="https://www.npmjs.com/package/@azure/static-web-apps-cli"
          title="static web app cli"
          target="_blank"
          rel="noreferrer"
        >
          static-web-app-cli
        </a>
        ) to emulated production environment
      </p>
    </div>
  );
}

export default AppInfoCard;
