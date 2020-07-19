import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 50px;
    background: #f4f5f6;
    > a {
        position:absolute;
        right: 0;
        margin:5px 15px 0 0;
        background: #fff;
        padding:5px;
        font-size: 20px;
        & + a {
            margin-right: 100px;
        }
    }
`
