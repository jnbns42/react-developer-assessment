import React, { Component } from 'react';
import { styled, css } from 'styled-components';
import Heading from './Heading';

import { Category } from '../interface';

type ComponentProps = {
    title: string,
    author: string,
    delay: number,
    categories: Category[]
}

type StyleProps = {
    $delay: number
}

const listReset = css`
  list-style: none;
  padding: 0;
  margin: 0;
  text-indent: 0;
`

const Card = styled.div<StyleProps>`
    box-sizing: border-box;
    text-align: center;
    background: linear-gradient(75deg,rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.5) 100%);
    padding: 20px;
    border: 1px solid rgba(0,0,0,0.5);
    border-radius: .5em;
    color: var(--white);
    opacity: 1;
    height: 100%;
    transition: all 0.25s ${props => 0.05 * props.$delay}s ease-out;
    @starting-style {
        opacity: 0;
        transform: translateY(10px)
    }
    &:is(.hide *) {
        opacity: 0;
        transform: translateY(10px)
    }
 `;

 const Categories = styled.ul`
    ${listReset}
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
 `

 const CategoryLabel = styled.li`
    background: var(--white);
    color: var(--black);
    border-radius: 1em;
    padding: 5px 10px;
    font-weight: 600;
    font-size: .75em;
`

export default class Book extends Component<ComponentProps> {
    render() {
        return <>
            <Card $delay={this.props.delay}>
                <Heading level="3" text={this.props.title}/>
                <span>By {this.props.author}</span>
                <Categories>
                    {this.props.categories.map(category => <CategoryLabel>{category.name}</CategoryLabel>)}
                </Categories>
            </Card>
        </>
    }
}