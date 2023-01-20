import React from 'react';
import { rtlrender } from 'test-utils';

import RootApp from './RootApp';

describe('RootApp', () => {
  test('It should render', () => {
    rtlrender(<RootApp />);
  });
});
