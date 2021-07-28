import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {useHistory} from "react-router-dom";
import ListItems from '../components/ListItems';
import ProjectsList from '../components/ProjectsList';
import * as Auth from '../provider/auth-provider'
import * as Client from '../provider/client-provider'
import { app } from '../app/app';
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

const categories = [
  {label: "", value: ""},
  {label: "Arte", value: "arte"},
  {label: "Comida", value: "comida"},
  {label: "Danza", value: "danza"},
  {label: "Diseño", value: "diseño"},
  {label: "Fotografía", value: "fotografía"},
  {label: "Legal", value: "legal"},
  {label: "Manualidades", value: "manualidades"},
  {label: "Música", value: "música"},
  {label: "Periodismo", value: "periodismo"},
  {label: "Publicaciones", value: "publicaciones"},
  {label: "Refugio", value: "refugio"},
  {label: "Software", value: "software"},
  {label: "Tecnología", value: "tecnología"},
  {label: "Transporte", value: "transporte"},
]

const stages = [
  {label: '', value: ''},
  {label: 'Por financiar', value: 'funding'},
  {label: 'En progreso', value: 'in_progress'},
  {label: 'Completado', value: 'completed'},
  {label: 'Cancelado', value: 'canceled'},
]

export function Projects() {
    const classes = useStyles();
    const [onRequestLogout, setOnRequestLogout] = React.useState(false);
    const [onRequestSearch, setOnRequestSearch] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const [projects, setProjects] = React.useState('');
    const limit = 10;
    const [page, setPage] = React.useState(1);
    const [ownerid, setOwnerid] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [type, setType] = React.useState('');
    const [stage, setStage] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState({status: "", detail: ""});
    const history = useHistory();
    
    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };
    
    function searchProjects() {
      setOnRequestSearch(true);

      let query = {};

      if (ownerid) query.ownerid = ownerid;
      if (limit) query.limit = limit;
      if (page) query.page = page;
      if (stage) query.stage = stage;
      if (type) query.type = type;
      if (tags) query.tags = tags.split(' ');

      Client.getProjectsAdmin(app.getToken(), query).then(response => {
          setProjects(response);
          setOnRequestSearch(false);
      }).catch(error => {
        console.log(error);
        setErrorMsg(Client.errorMessageTranslation(error));
      });
    }

    function returnNotAble() {
      return page <= 1;
    };

    function increaseNotAble() {
      return projects.length < limit;
    };

    function signOut() {
        setOnRequestLogout(true);
        Auth.signOut();
        app.signOutUser();  
        history.push(app.routes().login);
        setOnRequestLogout(false);
    }

    React.useEffect(() => {
      searchProjects();
    },[page])

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
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Proyectos
              </Typography>
              <Button
                  variant="contained"
                  className={classes.submit}
                  onClick={signOut}
                  disabled={onRequestLogout}
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
                  <form className={classes.form} noValidate>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          label="ID Usuario"
                          type="text"
                          required
                          fullWidth
                          autoFocus
                          value={ownerid}
                          onChange={event => setOwnerid(event.target.value)}
                      />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          label="Etiquetas"
                          type="text"
                          required
                          fullWidth
                          autoFocus
                          value={tags}
                          onChange={event => setTags(event.target.value)}
                      />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          label="Categoría"
                          select
                          required
                          fullWidth
                          autoFocus
                          value={type}
                          onChange={event => setType(event.target.value)}
                      >
                          {categories.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </TextField>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          label="Etapa"
                          type="text"
                          select
                          required
                          fullWidth
                          autoFocus
                          value={stage}
                          onChange={event => setStage(event.target.value)}
                      >
                            {stages.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </TextField>
                    <Button
                        disabled={onRequestSearch}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                          if (page !== 1) {
                            setPage(1);
                          } else {
                            searchProjects();
                          }
                        }}
                        style={{marginBottom: 30, marginTop: 15}}
                    >
                        BUSCAR
                    </Button>
                    </form>
                    <ProjectsList data={projects} />
                    <div style={{flexDirection:'row', alignSelf:'center', marginTop: 15}}>
                      <Button disabled={returnNotAble() || onRequestSearch} onClick={() => setPage(page-1)}>{'<<'}</Button>
                      {page}
                      <Button disabled={increaseNotAble() || onRequestSearch} onClick={() => setPage(page+1)}>{'>>'}</Button>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </main>
        </div>
    );
}