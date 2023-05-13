import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

export const Header = () => {
  const isAuth = false;

  const onClickLogout = () => {};

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>Events Post</div>
          </a>
          <div className={styles.buttons}>
          {isAuth ? (
  <>
    <a href="/posts/create">
      <Button variant="contained">Adauga postare</Button>
    </a>
    <Button onClick={onClickLogout} variant="contained" color="error">
      Iesi
    </Button>
  </>
) : null}
          </div>
        </div>
      </Container>
    </div>
  );
};
