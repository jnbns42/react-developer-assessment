import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Router } from 'react-router';
import {createMemoryHistory} from 'history'

import App from '../components/App';

import { createServer } from "miragejs";
import data from '../mock/data.json';

let server;

/**
 * Full disclosure, I learned a few things here. Not worked with Mirage before and I'm rusty on my tests.
 * I've had to revise some of this AFTER building the app out as tests were not passing, due to the tests themselves being wrong.
 * 
 * And because I rarely handle testing fetch requests. I learnt a few things here. Mirage is cool!
 */

beforeEach(() => {
    server = createServer();
    server.get('/api/posts', () => {
        return data;
    });
})

afterEach(() => {
    server.shutdown()
})

test('Application can mount and has a H1', async () => {
    const history = createMemoryHistory();

    const { container } = render(
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
    
    const { container } = render(
        <Router location={history} navigator={history}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    );

    await waitFor(() => {
        const cards = container.querySelectorAll(".library__book")
        expect(cards.length).toBeGreaterThan(0);
    });

})

test('Should show page 2', async () => {
    const history = createMemoryHistory();

    render(
        <Router location={history} navigator={history}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    );

    await waitFor(() => {
        expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Page 2');
    });
})