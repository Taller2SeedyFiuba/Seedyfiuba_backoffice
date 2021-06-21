import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {app} from '../app/app'
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignUp() {
  const classes = useStyles();
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function _setFirstname(event) {  // CHEQUEAR O CAMBIAR
    setFirstname(event.target.value);
  }

  function _setLastname(event) {  // CHEQUEAR O CAMBIAR
    setLastname(event.target.value);
  }

  function _setEmail(event) {  // CHEQUEAR O CAMBIAR
    setEmail(event.target.value);
  }

  function _setPassword(event) {  // CHEQUEAR O CAMBIAR
    setPassword(event.target.value);
  }

  function trySignUp() {  // CHEQUEAR O CAMBIAR
    app.loginUser("asd");
    history.push(app.routes().home);
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Nombre"
                type="text"
                required
                fullWidth
                autoFocus
                value={firstname}
                onChange={_setFirstname}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Apellido"
                type="text"
                required
                fullWidth
                autoFocus
                value={lastname}
                onChange={_setLastname}
            />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Email"
                type="email"
                required
                fullWidth
                autoFocus
                value={email}
                onChange={_setEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Contraseña"
                type="password"
                required
                fullWidth
                value={password}
                onChange={_setPassword}
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={trySignUp}
          >
            REGISTRARSE
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href={app.routes().login} variant="body2">
                ¿Ya tienes una cuenta? Ingresa
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}