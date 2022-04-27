import styled from 'styled-components'
import Head from 'next/head'
import GratitudeApp from "../components/GratitudeApp"
import { supabase } from '../lib/supabase'
import { Auth } from '@supabase/ui'

export default function Home() {
  // comes from our Auth UserContextProvider
  const { user } = Auth.useUser()

  return <Wrapper>
    <Head>
      <title> Gratitude Journal </title>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
    </Head>
      {/* 
				* Check if user is logged in or not. 
				* If not, display the login UI
				* If logged in, display the app 
				* & pass the user in as props
				*/
        !user ? (
          <Content>
            <StyledAuth
              supabaseClient={supabase}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
            />
            </Content>
        ) : (
          <Content>
            <GratitudeApp user={user} />
            <LogoutButton
              onClick={async () => {
                const { error } = await supabase.auth.signOut()
                if (error) console.log('Error logging out:', error.message)
              }}
            >
              Logout
            </LogoutButton>
          </Content>
        )}
  </Wrapper>
}

const StyledAuth = styled(Auth)`
  .sbui-btn {
    background-color: var(--rose);
  }
  .sbui-btn:hover {
    background-color: var(--rose);
  }

  label {
    color: var(--parchment);
  }

  .sbui-typography-link {
    color: var(--parchment);
  }
  .sbui-typography-text {
    color: var(--parchment);
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
`

const Content = styled.div`
  padding-top: 50px;
  flex: 1;
  max-width: min(100%, 900px);
`

const LogoutButton = styled.button`
  width: 100%;
  background-color: var(--rose);
  color: var(--burnt);
  border: none;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 500; 
  margin-top: 20px;
  margin-bottom: 20px;
  `
