import React from 'react'
import Header from '../components/Header/Header'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import {Container, Button} from '@mui/material';

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
  linkAnchor: {
    color: 'teal',
    display: 'block',
    lineHeight: '160%',
  },
}

const Home = () => {
  const AuthUser = useAuthUser();
  console.log('AuthUser: ', AuthUser);
  return (
    <div>
      <Header user={AuthUser} />
      <Container maxWidth="xl">
        <h2>Welcome to your crypto finance dashboard.</h2>
        <ul>
          <li>fetch my wallet from <Button onClick="api/coinbase">coinbaseAPI</Button></li>
          <li>fetch my wallet from coinbaseProAPI</li>
          <li>fetch my wallet from Metamask</li>
        </ul>
      </Container>
    </div>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Home)
