import React, { Component } from 'react';
import { styled } from 'styled-components';

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
    font-size: ${ props => 3/props.$level }em;
`

export default class Heading extends Component<ComponentProps> {
    render() {
        return <StyledHeading as={`h${this.props.level}`} $level={parseInt(this.props.level)}>
            {this.props.text}
        </StyledHeading>

    }
}