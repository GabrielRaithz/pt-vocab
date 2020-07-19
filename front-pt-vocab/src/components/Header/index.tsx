import React from 'react';
import { Container } from './styles';

const Header: React.FC = () => (
    <Container>
        <a href="/">home</a>
        <a href="/about">about</a>
    </Container>
)

export default Header;