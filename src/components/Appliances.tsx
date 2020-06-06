import React, { useState, useEffect } from 'react'
import { Cloud, IAppliance } from 'nature-remo';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ControllCell } from "./ControllCell";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
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

const accessToken = localStorage.getItem("remoAccessToken");
const client = new Cloud(accessToken!)

function useRemo() {
  const [appliances, setAppliances] = useState<IAppliance[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      setIsLoading(true);
      const data = await client.getAppliances();
      setAppliances(data);
      setIsLoading(false);
    }
    fetchDevices();
  }, []);
  return [{ appliances, isLoading }]
}

export function Appliances() {
  const classes = useStyles();
  const [{ appliances, isLoading }] = useRemo();

  return <Grid item xs={12}>
    <Paper className={classes.paper}>
      {isLoading ? <CircularProgress /> : <>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Recent Orders
      </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NickName</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Controll</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appliances.map((appliance) => (
              <TableRow key={appliance.id}>
                <TableCell>{appliance.id}</TableCell>
                <TableCell>
                  {/* <Link href={`/appliances/${appliance.id}`}>{appliance.nickname}</Link> */}
                  {appliance.nickname}
                </TableCell>
                <TableCell>{appliance.type}</TableCell>
                <TableCell><ControllCell appliance={appliance}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table></>}
    </Paper>
  </Grid>
}