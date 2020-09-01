import React from 'react';
import { Container } from './styles';

const Header: React.FC = () => (
    <Container>
        <a href="/">Home</a>
        <a href="/about">About</a>
    </Container>
)

export default Header;