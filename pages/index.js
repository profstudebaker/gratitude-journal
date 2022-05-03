import styled from 'styled-components'
import Head from 'next/head'
import GratitudeApp from "../components/GratitudeApp"
import { supabase } from '../lib/supabase'
import { Auth } from '@supabase/ui'
import { useSession } from '../context/user-context'
import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home({ gratitudes }) {
  const { session } = useSession()
  const { data, error, mutate } = useSWR(
    "/api/gratitudes",
    fetcher
  );

  async function addGratitude(entry) {
    try {
      // Update the local state immediately and fire the
      // request. Since the API will return the updated
      // data, there is no need to start a new revalidation
      // and we can directly populate the cache.
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

  async function deleteAll() {
    const { data, error } = await supabase
        .from('gratitudes')
        .delete()
        .eq("entry", "iced coffee");

    console.log("dispacthed the delete")
    console.log('error: ', error)
    // try {
    //   // Update the local state immediately and fire the
    //   // request. Since the API will return the updated
    //   // data, there is no need to start a new revalidation
    //   // and we can directly populate the cache.
    //   await mutate(fetch(`/api/gratitudes/delete`), {
    //     optimisticData: [],
    //     rollbackOnError: true,
    //     populateCache: false,
    //     revalidate: true
    //   });
    // } catch (e) {
    //   // If the API errors, the original data will be
    //   // rolled back by SWR automatically.
    //   console.log("ERROR!")
    // }
  }

  if(error) {
    return<Wrapper>{error.message}</Wrapper>
  }

  if (!data) {
    return <Wrapper>Loading...</Wrapper>
  }

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
        !session ? (
          <Content>
            <h1> not logged in </h1>
            </Content>
        ) : (
          <Content>
            <GratitudeApp user={session.user} data={data} addGratitude={addGratitude} deleteAll={deleteAll} />
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

export const getServerSideProps = async (context) => {
  // get the user using the "sb:token" cookie
  const { user } = await supabase.auth.api.getUserByCookie(context.req)
  if (!user) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      }
    }
  }
  supabase.auth.setAuth(context.req.cookies["sb-access-token"])
  const { data: gratitudes, error } = await supabase
    .from('gratitudes')
    .select('*')

  if (error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      gratitudes
    }
  }
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
