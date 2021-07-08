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

const raw_categories = ['', 'arte', 'comida', 'danza', 'diseño', 'fotografía', 
'legal', 'manualidades', 'música', 'periodismo', 'publicaciones', 'refugio', 
'software', 'tecnología', 'transporte'];

const categories = raw_categories.map((element) => {
    return { label: element.charAt(0).toUpperCase() + element.slice(1), value: element }
})

const raw_stages = ['', 'en curso', 'cancelado', 'completado']

const stages = raw_stages.map((element) =>{
    return { label: element.charAt(0).toUpperCase() + element.slice(1), value: element }
})

export function Projects() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [projects, setProjects] = React.useState('');
    const limit = 10;
    const [page, setPage] = React.useState(1);
    const [tags, setTags] = React.useState('');
    const [type, setType] = React.useState('');
    const [stage, setStage] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [dist, setDist] = React.useState('');
    const [lat, setLat] = React.useState('');
    const [lng, setLng] = React.useState('');
    const history = useHistory();
    
    function _setTags(event) {  // CHEQUEAR O CAMBIAR
        setTags(event.target.value);
    }
    
    function _setType(event) {  // CHEQUEAR O CAMBIAR
        setType(event.target.value);
    }
    
    function _setStage(event) {  // CHEQUEAR O CAMBIAR
        setStage(event.target.value);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    function searchProjects() {
        let query = {};

        if (limit) query.limit = limit;
        if (page) query.page = page;
        if (stage) query.stage = stage;
        if (type) query.type = type;
        if (tags) query.tags = tags.split(' ');

        console.log(query);

        Client.getProjectsAdmin(app.getToken(), query).then(response => {
            setProjects(response);
        });
    }

    function returnNotAble() {
        return page <= 1;
    };

    function increaseNotAble() {
        return projects.length < limit;
    };

    function signOut() {
        Auth.signOut();
        app.signOutUser();  
        history.push(app.routes().login);
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
                Proyectos
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
                          label="Etiquetas"
                          type="text"
                          required
                          fullWidth
                          autoFocus
                          value={tags}
                          onChange={_setTags}
                      />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          label="Categoría"
                        //   type="text"
                          select
                          required
                          fullWidth
                          autoFocus
                          value={type}
                          onChange={_setType}
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
                          onChange={_setStage}
                      >
                            {stages.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </TextField>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={searchProjects}
                        style={{marginBottom: 30, marginTop: 15}}
                    >
                        BUSCAR
                    </Button>
                    </form>
                    <ProjectsList data={projects} />
                    <div style={{flexDirection:'row', alignSelf:'center', marginTop: 15}}>
                      <Button disabled={returnNotAble()} onClick={() => {setPage(page-1); searchProjects();}}>{'<<'}</Button>
                      {page}
                      <Button disabled={increaseNotAble()} onClick={() => {setPage(page+1); searchProjects();}}>{'>>'}</Button>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </main>
        </div>
    );
}