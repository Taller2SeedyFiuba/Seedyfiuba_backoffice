import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useHistory } from "react-router-dom";
import ListItems from '../components/ListItems';
import TimeCharts from '../components/TimeCharts';
import ProjectCharts from '../components/ProjectCharts';
import UserCharts from '../components/UserCharts';
import * as Auth from '../provider/auth-provider'
import * as Client from '../provider/client-provider'
import { app } from '../app/app';

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
    justifyContent: 'center',
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 350,
  },
}));

export function Metrics() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [historicMetrics, setHistoricMetrics] = React.useState(null);
  const [presentMetrics, setPresentMetrics] = React.useState(null);
  const [userMetrics, setUserMetrics] = React.useState(null);
  const [projectMetrics, setProjectMetrics] = React.useState(null);
  const [intervalUsers, setIntervalUsers] = React.useState("hour");
  const [intervalProjects, setIntervalProjects] = React.useState("hour");
  const history = useHistory();
  
  React.useEffect(() => {
    Client.getAllMetricsAdmin(app.getToken())
      .then(response => {
        setHistoricMetrics(response);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    let date = new Date();
    let d1 = String(date.getDate()).padStart(2, '0');
    let m1 = String(date.getMonth() + 1).padStart(2, '0'); 
    let y1 = date.getFullYear();

    date.setDate(date.getDate() + 1)
    let d2 = String(date.getDate()).padStart(2, '0');
    let m2 = String(date.getMonth() + 1).padStart(2, '0'); 
    let y2 = date.getFullYear();
    
    Client.getMetricsAdmin(app.getToken(), "second", `${y1}-${m1}-${d1}`, `${y2}-${m2}-${d2}`)
      .then(response => {
        setPresentMetrics(response);
      })
      .catch(error => {
        console.log(error);
      });
  },[]);

  React.useEffect(() => {
    let date = new Date();
    let date2 = new Date();
    date2.setDate(date2.getDate() + 1);

    if (intervalUsers === "day") {
      date.setMonth(date.getMonth() - 1);
    } else if (intervalUsers === "month") {
      date.setFullYear(date.getFullYear() - 1);
    }

    let d1 = String(date.getDate()).padStart(2, '0');
    let m1 = String(date.getMonth() + 1).padStart(2, '0'); 
    let y1 = date.getFullYear();
    let d2 = String(date2.getDate()).padStart(2, '0');
    let m2 = String(date2.getMonth() + 1).padStart(2, '0'); 
    let y2 = date2.getFullYear();

    Client.getMetricsAdmin(app.getToken(), intervalUsers, `${y1}-${m1}-${d1}`, `${y2}-${m2}-${d2}`)
      .then(response => {
        console.log(response);
        setUserMetrics(response);
      })
      .catch(error => {
        console.log(error);
      });
  },[intervalUsers]);

  React.useEffect(() => {
    let date = new Date();
    let date2 = new Date();
    date2.setDate(date2.getDate() + 1);

    if (intervalProjects === "day") {
      date.setMonth(date.getMonth() - 1);
    } else if (intervalProjects === "month") {
      date.setFullYear(date.getFullYear() - 1);
    }

    let d1 = String(date.getDate()).padStart(2, '0');
    let m1 = String(date.getMonth() + 1).padStart(2, '0'); 
    let y1 = date.getFullYear();
    let d2 = String(date2.getDate()).padStart(2, '0');
    let m2 = String(date2.getMonth() + 1).padStart(2, '0'); 
    let y2 = date2.getFullYear();
    
    Client.getMetricsAdmin(app.getToken(), intervalProjects, `${y1}-${m1}-${d1}`, `${y2}-${m2}-${d2}`)
    .then(response => {
      console.log(response);
      setProjectMetrics(response);
    })
    .catch(error => {
      console.log(error);
    });
  },[intervalProjects]);

  function _setIntervalUsers(value) {
    setIntervalUsers(value);
    console.log(value);
  } 

  function _setIntervalProjects(value) {
    setIntervalProjects(value);
    console.log(value);
  } 

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  function signOut() {
    Auth.signOut();
    app.signOutUser();  
    history.push(app.routes().login);
  }

  const allMetrics = () => {
    return historicMetrics && presentMetrics && userMetrics && projectMetrics;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
            </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Métricas
          </Typography>
          <Button
              variant="contained"
              className={classes.submit}
              onClick={signOut}
            >
              CERRAR SESIÓN
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <ListItems />
      </Drawer>
      {allMetrics() ? 
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container>              
            <TimeCharts 
              userMetrics={userMetrics}
              projectMetrics={projectMetrics}
              intervalUsers={intervalUsers}
              setIntervalUsers={_setIntervalUsers}
              intervalProjects={intervalProjects}
              setIntervalProjects={_setIntervalProjects}
            />
            <ProjectCharts 
              historicMetrics={historicMetrics}
            />
            <UserCharts 
              historicMetrics={historicMetrics}
              presentMetrics={presentMetrics}
            />
          </Grid>
        </Container>
      </main>
      :
      <></>}
    </div>
  );
}
