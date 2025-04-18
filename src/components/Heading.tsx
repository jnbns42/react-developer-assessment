import React, { Component } from 'react';
import { styled } from 'styled-components';

/**
 * Wanted to include a reusable heading that could be reused across
 * multiple parts of an application. 
 * 
 * Styling is basic, but the idea is that styling for headings would be consistent across
 * the app, and all styles relating to headings would be contained within here...
 */

type StyleProps = {
    $level: number
}
type ComponentProps = {
    level: string
    text: string
}
const StyledHeading = styled.span<StyleProps>`
    font-weight: 600;
    text-align: center;
    color: var(--white);
    margin: 0 0 30px 0;
    font-size: ${ props => 3/props.$level }em;
`

export default class Heading extends Component<ComponentProps> {
    render() {
        return <StyledHeading as={`h${this.props.level}`} $level={parseInt(this.props.level)}>
            {this.props.text}
        </StyledHeading>
    }
}