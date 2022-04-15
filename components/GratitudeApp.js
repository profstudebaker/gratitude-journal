import { useState } from "react"
import History from "./History";
import Input from "./Input";
import styled from "styled-components"
import DecorativeLineBreak from "./DecorativeLineBreak";

const test = [
    'finger picked guitar',
    'hot tea',
    'birdsong'
]


export default function GratitudeApp() {
    const [data, setData] = useState([]);
    
    const addGratitude = (newGratitude) => {
        setData([...data, newGratitude])
    }

    const clearGratitudes = (e) => setData([]);

    return <Wrapper>
            <DecorativeArc>
                <Title>Gratitude Journal</Title>
                {
                    data.length === 0 &&
                    <>
                    <ImageWrapper>
                    <img src="https://i.pinimg.com/originals/77/d0/a7/77d0a7c454e658833800528e748edbe9.png" alt="Illustration of woman meditating" />
                    </ImageWrapper>
                    <p>Reflect on the things in your life that make you feel joy.</p>
                    <Spacer height={20} />
                    </>
                }
                <Input addGratitude={addGratitude}/>
                {
                    data.length > 0 ? (
                    <>
                    <DecorativeLineBreak />
                    <History data={data} />
                    <DecorativeLineBreak />
                    <Button onClick={clearGratitudes}>Start Again</Button>
                    <Spacer height={30} />
                    </> )
                    : (
                        <Spacer height={40} />
                    )
                }
            </DecorativeArc>
    </Wrapper>
}

const Spacer = styled.div`
    height: ${(p) => p.height}px;
`

const Wrapper = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 30px max(10px, 10%);
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
`

const DecorativeArc = styled.div`
    background-color: var(--parchment);
    color: var(--burnt);
    text-align: center;
    width: min(100%, 800px);
    border-radius: 180px 180px 10px 10px;
    padding: 20px 10%;
`

const Title = styled.h1`
    font-size: 4rem;
    text-transform: none;
    letter-spacing: 0px;
    line-height: 1;
    font-family: 'Lalezar', serif;
`

const Button = styled.button`
    background: transparent;
    width: 100%;
    border: 3px solid var(--burnt);
    border-radius: 5px;
    color: var(--burnt);
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: inherit;
    letter-spacing: inherit;
    padding: 15px;
    cursor: pointer;
    transition: all 200ms;

    &:hover {
        background-color: var(--burnt);
        color: var(--parchment);
    }
`

const ImageWrapper = styled.div`
    width: 100%;
    /* cut off the extra whitespace within image  */
    margin-top: -90px;
    margin-bottom: -40px;
    img {
        width: 100%;
        object-fit: cover;
        display: block;
    }
`