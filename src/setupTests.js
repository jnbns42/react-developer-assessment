// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
global.TextEncoder = require('util').TextEncoder; // Fixing TextEncoder Error: https://www.dhiwise.com/post/how-to-resolve-the-error-textencoder-is-not-defined-jes