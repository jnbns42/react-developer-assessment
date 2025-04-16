import React, { Component } from 'react';
import { styled } from 'styled-components';

type Props = {
    title: string
}

const Card = styled.div`
    text-align: center;
    color: var(--white);
 `;

export default class Book extends Component<Props> {
    render() {
        return <>
            <Card>{this.props.title}</Card>
        </>
    }
}