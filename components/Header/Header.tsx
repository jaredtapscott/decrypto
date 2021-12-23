import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { Container, Button, Box, Grid} from '@mui/material';
import UserMenu from '../User/Menu/Menu';

  const Header = ({user}) => (
  <Box sx={{
    color: 'white',
    backgroundColor: 'primary.dark',
  }}>
    <Container maxWidth="xl" className={styles.wrapper}>
      <Grid container spacing={0}>
        <Grid item xs="11">
          <h1 className={styles.title}><Link href="/">Decrypto</Link></h1>
        </Grid>
        <Grid item xs="1">
          {user.email ? (
            <UserMenu user={user} />
          ) : (
            <Link href="/auth/auth">
                <Button 
                  variant="contained"
                  color="secondary"
                >
                  Sign in
                </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </Container>
  </Box>
)

export default Header