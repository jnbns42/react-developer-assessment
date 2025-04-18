import React, { Component } from 'react';
import { styled } from 'styled-components';


const H1 = styled.h1`
    text-align: center;
    color: var(--white);
 `;

export default class Details extends Component {
    render() {
        return <>
            <H1>A big list of books</H1>
        </>
    }
}