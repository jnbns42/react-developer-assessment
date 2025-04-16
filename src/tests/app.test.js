import { screen } from '@testing-library/dom';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '../components/App';

test('Application can mount', () => {
    document.body.innerHTML = `
        <div id="root"></div>
    `
    ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        document.getElementById('root'),
    );

    expect(screen.getByText('Hello World')).toBeVisible()
})
