import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Router, useSearchParams } from 'react-router';
import {createMemoryHistory} from 'history'

import App from '../components/App';

import { createServer } from "miragejs";
import data from '../mock/data.json';

let server;

/**
 * Silencing an error relating to CSS parsing in JSDom...
 * Full disclosure, 
 */
console.error = (message, ...optionalParams) => {
    if (message.includes('Could not parse CSS stylesheet')) {
        return;
    }
};

/** 
 * Full disclosure, I learned a few things here. Not worked with Mirage before and I'm rusty on my tests.
 * I've had to revise some of this AFTER building the app out as tests were not passing, due to the tests themselves being wrong.
 * 
 * And because I rarely handle testing fetch requests. I learnt a few things here. Mirage is cool!
 */

beforeEach(async () => {
    server = createServer();
    server.logging = false;

    await server.get('/api/posts', () => {
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

/**
 * Ok, so this is embaressing, but I have to throw in the towel on this one...
 * This test fails. I know the specific thing Im trying to test here works
 * but it seems the app has issues setting the query params in this context.
 * 
 * PLEASE tell me what I am doing wrong here becasue it is annoying me!
 * 
 * I should also go on to say once I fixed this, I was planning on writing a
 * test for my category filter, which would check for the occurance of the selected category
 * per displayed book, but as that is dependant on query params as per test 
 * requirements, this is a bit of a blocker.
 */
test('Should show page 2', async () => {

    const history = createMemoryHistory({ initialEntries: ['?p=1'] });
    const user = userEvent.setup()

    const { container } = render(
        <Router history={history} search={history.location.search} location={history.location} navigator={history.navigator}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    );


    await waitFor(async () => {

        const heading = screen.getByRole('heading', {level: 2});
        const button =  screen.getByTestId(/button-page-2/i);

        expect(button).toBeVisible();
        await user.click(button); 
        await expect(history.location.search).toEqual('?p=2');

        await expect(heading).toHaveTextContent('Page 2');
    })
 
    
});