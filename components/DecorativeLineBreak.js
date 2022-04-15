import styled from "styled-components"

export default function DecorativeLineBreak() {
    return (
        <LineBreak>* * * * *</LineBreak>
    )
}

const LineBreak = styled.div`
    font-size: 3rem;
    color: var(--rose);
    padding: 10px 0px;
    line-height: 1;
    transform: translateY(10px);
`