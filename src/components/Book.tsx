import React, { Component } from 'react';
import { styled } from 'styled-components';

type ComponentProps = {
    title: string,
    delay: number
}

type StyleProps = {
    $delay: number
}

const Card = styled.div<StyleProps>`
    box-sizing: border-box;
    text-align: left;
    background: linear-gradient(75deg,rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.5) 100%);
    padding: 20px;
    border: 1px solid var(--black);
    border-radius: .5em;
    color: var(--white);
    opacity: 1;
    height: 100%;
    transition: all 0.25s ${props => 0.05 * props.$delay}s ease-out;
    @starting-style {
        opacity: 0;
        transform: translateY(10px)
    }
 `;

export default class Book extends Component<ComponentProps> {
    render() {
        return <>
            <Card $delay={this.props.delay}><h3>{this.props.title}</h3></Card>
        </>
    }
}