import {useState} from "react"
import styled from "styled-components"

export default function Input({ addGratitude }) {
    const [value, setValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (value.length > 0) {
            addGratitude(value);
        }
        setValue("");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <label htmlFor="new-gratitude">Add a Gratitude</label>
            <input id="new-gratitude" value={value} onChange={(e) => setValue(e.target.value)}/>
            <Spacer height={10} />
            <Button type="submit">Add</Button>
        </Form>
    )
}

const Button = styled.button`
    background: var(--burnt);
    color: var(--parchment);
    letter-spacing: inherit;
    text-transform: inherit;
    font-size: 1rem;
    padding: 10px;
    border: 3px solid var(--burnt);
    border-radius: 5px;
`

const Spacer = styled.div`
    height: ${p => p.height}px;
`

const Form = styled.form`
    font-size: 1.4rem;
    text-align: left;
    display: flex;
    flex-direction: column;

    label {
        font-size: 1rem;
        padding: 5px;
    }

    input {
        background: transparent;
        font-size: inherit;
        padding: 10px;
        border: 3px solid var(--burnt);
        border-radius: 5px;
    }
`