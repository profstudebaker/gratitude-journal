import { useState } from 'react'
import { supabase } from '../lib/supabase'
import AuthForm from '../components/AuthForm'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import styled from 'styled-components'

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const submitForm = async (evt) => {
    evt.preventDefault()
    const { data, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (!error) {
      router.replace('/')
    }
  }

  return (
    <Wrapper>
        <Content>
        <Title>Gratitude Journal</Title>
        <AuthForm
            email={email}
            onEmailChange={(evt) => setEmail(evt.target.value)}
            password={password}
            onPasswordChange={(evt) => setPassword(evt.target.value)}
            onSubmit={submitForm}
        />

        <Link href='/signup'>
            Already logged in? Sign up
        </Link>
      </Content>
    </Wrapper>
  )
}

export const getServerSideProps = async (context) => {
  // get the user using the "sb:token" cookie
  const { user } = await supabase.auth.api.getUserByCookie(context.req)
  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Title = styled.h1`
    font-size: 4rem;
    text-transform: none;
    letter-spacing: 0px;
    line-height: 1;
    font-family: 'Lalezar', serif;
    text-align: center;
`


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const Content = styled.div`
  padding-top: 50px;
  flex: 1;
  max-width: min(100%, 900px);
`