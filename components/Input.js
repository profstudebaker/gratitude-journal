import {useState} from "react"
import styled from "styled-components"

export default function Input({ addGratitude }) {
    const [value, setValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        addGratitude(value);
        setValue("");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <label htmlFor="new-gratitude">Add a Gratitude</label>
            <input id="new-gratitude" value={value} onChange={(e) => setValue(e.target.value)}/>
            <Spacer height={10} />
            <button type="submit">Give Thanks</button>
        </Form>
    )
}

const Spacer = styled.div`
    height: ${p => p.height};
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

    input, button {
        background: transparent;
        font-size: inherit;
        color: inherit;
        letter-spacing: inherit;
        text-transform: inherit;
        padding: 10px;
        border: 3px solid var(--burnt);
        border-radius: 5px;
    }
`