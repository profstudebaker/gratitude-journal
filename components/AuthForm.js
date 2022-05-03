// https://github.com/Ngineer101/nextjs-supabase-crud/blob/main/components/auth-form.js
import styled from "styled-components"

export default function AuthForm({
    email,
    onEmailChange,
    password,
    onPasswordChange,
    onSubmit
  }) {
    return (
      <Wrapper onSubmit={onSubmit}>
        <Field>
        <label htmlFor="email">Email</label>
        <input
            name='email'
            type='email'
            id="email"
            value={email}
            placeholder='Email'
            onChange={onEmailChange}
          />
        </Field>
        <Field>
        <label htmlFor="password">Password</label>
        <input
            name='password'
            type='password'
            id="password"
            value={password}
            placeholder='Password'
            onChange={onPasswordChange}
          />
        </Field>
        <Spacer height={20}/>
        <button type='submit'>Log In</button>
      </Wrapper>
    )
  }

const Spacer = styled.div`
  height: ${(p) => p.height}px;
`;

const Error = styled.strong`
  margin: 0;
  padding-bottom: 5px;
  color: red;
  text-transform: uppercase;
  font-size: 0.6rem;
`;

const Wrapper = styled.form`
  background-color: var(--gray-100);
  border-radius: 10px;
  padding: 20px;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    color: var(--gray-400);
  }

  button {
    cursor: pointer;
    background-color: var(--rose);
    border: none;
    color: var(--burnt);
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    box-shadow: var(--shadow-elevation-medium);
  }
  button:disabled {
    background-color: var(--gray-200);
    cursor: not-allowed;
  }
`;

const Field = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;

  input {
    padding: 8px;
    border: none;
    border-radius: 5px;
    box-shadow: var(--shadow-elevation-medium);
  }

  label {
    padding-bottom: 5px;
    text-transform: uppercase;
    font-size: 0.6rem;
    color: var(--gray-300);
  }
`;