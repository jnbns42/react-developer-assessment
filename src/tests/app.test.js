import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Router } from 'react-router';
import {createMemoryHistory} from 'history'

import App from '../components/App';

beforeEach(async () => {

    
})

test('Application can mount and has a H1', async () => {
    const history = createMemoryHistory();

    
    render(
        <Router location={history} navigator={history}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    );
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('A big list of books');
})

test('Landing page has a least one book', async () => {
    const history = createMemoryHistory();
    
    render(
        <Router location={history} navigator={history}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    );
    
    const card = screen.getByRole('li');
    
    expect(card.classList.contains('library__book')).toBe(true);
})

test('Should show page 2', async () => {
    const history = createMemoryHistory();
    history.push('/?p=2');
    
    render(
        <Router location={history} navigator={history}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    );
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Page 2');
})