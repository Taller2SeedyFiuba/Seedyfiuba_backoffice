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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory, useParams} from "react-router-dom";
import ListItems from '../components/ListItems';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { app } from '../app/app';
import * as Auth from '../provider/auth-provider'
import * as Client from '../provider/client-provider'
import DialogResponse from '../components/DialogResponse';

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

export function UserView() {
  let { id } = useParams();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [user, setUser] = React.useState('');
  const [onRequest, setOnRequest] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState({status: "", detail: ""});
  const history = useHistory();
  
    React.useEffect(() => {
      Client.getUserAdminByID(app.getToken(), id)
        .then(response => {
          setUser(response);
        }).catch(error => {
          setErrorMsg(Client.errorMessageTranslation(error));
        });
    }, [])
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const makeAdmin = () => {
    setOnRequest(true);

    Client.promoteUserAdminByID(app.getToken(), user.id)
      .then(response => 
      setUser({...user, isadmin:true})
    ).catch(error => {
      setErrorMsg(Client.errorMessageTranslation(error));
    });
  }

  function goBack() {
    history.goBack();
  }

  function signOut() {
    setOnRequest(true);
    Auth.signOut();
    app.signOutUser();
    history.push(app.routes().login);
    setOnRequest(false);
  }

  function isDialogOpen() {
    return errorMsg.detail !== "";
  }

  function closeDialog() {
    setErrorMsg({status: "", detail: ""});
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <DialogResponse
        open={isDialogOpen()}
        handleClose={closeDialog}
        status={errorMsg.status}
        errorMsg={errorMsg.detail}
      />
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

          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={goBack}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Usuarios
          </Typography>
          <Button
              variant="contained"
              className={classes.submit}
              onClick={signOut}
              disabled={onRequest}
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
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container >
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Card className={classes.root}> 
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.firstname} {user.lastname}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      ID: {user.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Email: {user.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Fecha de Nacimiento: {user.birthdate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Fecha de Ingreso: {user.signindate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Es veedor?: {user.isviewer ? 'Si' : 'No'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Es admin?: {user.isadmin ? 'Si' : 'No'}
                    </Typography>
                    <Button onClick={makeAdmin} disabled={user.isadmin || onRequest} size="medium" color="primary">
                      Hacer Admin
                    </Button>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}