import React from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import Header from '../../components/Header/Header'
import {Container} from '@mui/material';

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

const Profile = () => {
  const AuthUser = useAuthUser()
  return (
    <div>
      <Header user={AuthUser} />
      <Container maxWidth="xl">
        <p>Your email is <strong>{AuthUser.email ? AuthUser.email : 'unknown'}</strong>.</p>
      </Container>
    </div>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Profile)