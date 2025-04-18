import React, { Component } from 'react';
import { styled } from 'styled-components';
import Heading from './Heading';

export default class Header extends Component {
    render() {
        return <>
            <Heading level="1" text="A big list of books"/>
        </>
    }
}