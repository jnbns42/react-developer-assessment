import React, { Component } from 'react';
import { styled } from 'styled-components';


const H1 = styled.h1`
    text-align: center;
 `;

export default class Header extends Component {
    render() {
        return <>
            <H1>A big list of books</H1>
        </>
    }
}