import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 31px;
    background: #ba432f;
    > a {
        position:absolute;
        right: 0;
        text-decoration: none;
        color: #e38676;
        margin:0px 20px 0 0;
        background: #5c1003;
        padding:5px 0 0 5px;
        font-size: 20px;
        & + a {
            margin-right: 100px;
        }
    }
`
