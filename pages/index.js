import styled from 'styled-components'
import Head from 'next/head'
import GratitudeApp from "../components/GratitudeApp"
import { supabase } from '../lib/supabase'
import { Auth } from '@supabase/ui'
import { useSession } from '../context/user-context'
import useSWR, { SWRConfig } from "swr"
import { useRouter } from 'next/router'

// a reusable function to pass in to swr, like in our weather app example
// it just fetches the parameter and returns the result as json
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home({ fallback }) {
  // use our Context hook to get info about the current session 
  // including logged in user
  const { session } = useSession()
  const router = useRouter()
  // setting up SWR on our gratitudes endpoint, but this time we have a mutate function
  // that will allow us to perform optimistic UI updates when a user
  // adds a new gratitude
  const { data, error, mutate } = useSWR(
    "/api/gratitudes",
    fetcher
  );

  async function addGratitude(entry) {
    try {
      // Update the local state immediately and fire the request
      // passing in the entered value as a query parameter
      await mutate(fetch(`/api/gratitudes/add/?entry=${entry}`), {
        optimisticData: [...data, entry],
        rollbackOnError: true,
        populateCache: false,
        revalidate: true
      });
    } catch (e) {
      // If the API errors, the original data will be
      // rolled back by SWR automatically.
      console.log("ERROR!")
    }
  }

  if (error) {
    return<Wrapper>{error.message}</Wrapper>
  }

  if (!data) {
    return <Wrapper>Loading...</Wrapper>
  }

  if(!session) {
    router.push('/signin')
  } else {
  return (
  <SWRConfig value ={{ fallback }}>
  <Wrapper>
    <Head>
      <title> Gratitude Journal </title>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
    </Head>
      {
          <Content>
            <GratitudeApp user={session.user} data={data} addGratitude={addGratitude} />
            <LogoutButton
              onClick={async () => {
                const { error } = await supabase.auth.signOut()
                router.push('/signin')
                if (error) console.log('Error logging out:', error.message)
              }}
            >
              Logout
            </LogoutButton>
          </Content>
        }
  </Wrapper>
  </SWRConfig>
  )}
}

export const getServerSideProps = async (context) => {
  // get the user using the auth cookie
  const { user } = await supabase.auth.api.getUserByCookie(context.req)

  // if no user is logged in when we send a request for this page,
  // redirect from this page to the signin page automatically
  if (!user) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      }
    }
  }

  // if we do have a logged in user, tell supabase who it is
  supabase.auth.setAuth(context.req.cookies["sb-access-token"])
  // then we can make our call to the database using supabase api methods
  // we don't need to filter for the user
  // because Row Level Security is enabled and automatically adds
  // a "WHERE id = this.user.id" type clause onto our queries
  const { data: gratitudes, error } = await supabase
    .from('gratitudes')
    .select('*')

  if (error) {
    return {
      notFound: true,
    }
  }

  // send the gratitudes as our default info to the Home Page
  return {
    props: {
      gratitudes
    }
  }
}

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
