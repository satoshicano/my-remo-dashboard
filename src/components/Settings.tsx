import React, { useState, useCallback } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, FormControl, InputLabel, Input, FormHelperText, Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { validateRemoClient, initRemo } from '../lib/Remo';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
type Props = {
  isAuthorized: boolean
}
export function Settings(props: Props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [isError, setIsError] = useState(false);

  const authorize = useCallback(async () => {
    try {
      setIsError(false);
      console.log(accessToken);
      localStorage.setItem("remoAccessToken", accessToken);
      initRemo();
      await validateRemoClient();
      setIsAuthorized(true);
    } catch (error) {
      setIsError(true);
      setIsAuthorized(false);
    }
  }, [accessToken])

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAccessToken(event.target.value);
  };

  return <Grid item xs={12} md={8} lg={9}>
    <Paper className={fixedHeightPaper}>
      <div>Go to <Link href="https://home.nature.global/home">this page</Link> and generate Access Token.</div>
      <div>
        <FormControl error={isError}>
          <InputLabel>Access Token</InputLabel>
          <Input value={accessToken} onChange={handleChangeInput} />
          {isError && <FormHelperText>Error: please check your access token</FormHelperText>}
        </FormControl>
        <Button variant="contained" color="primary" onClick={authorize}>
          Save
      </Button>
      </div>
      <>{isAuthorized && "Configured"}</>
    </Paper>
  </Grid>
}
