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
import DialogResponse from '../components/DialogResponse';
import * as Auth from "../provider/auth-provider"
import * as Client from "../provider/client-provider"

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
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confPassword, setConfPassword] = React.useState('');
  const [onRequest, setOnRequest] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState({status: "", detail: ""});
  const history = useHistory();

  function checkMailAndPassword() {
    return ((email.includes('@')) && (email.length > 5) && 
      (password.length > 5) && (password === confPassword));
  }

  async function trySignUp() {  // CHEQUEAR O CAMBIAR
    setOnRequest(true);
    if (checkMailAndPassword()) {
      try {
        await Auth.createUserWithMailAndPassword(email, password);
        let token = await Auth.getIdToken(true);
        app.loginUser(token);
        app.setEmail(email);
        Client.getUserData(token)
          .then((resp) => {
            app.loginRegisteredUSer(resp.id);
            history.push(app.routes().users);
            setOnRequest(false);
          })
          .catch((error) => {
            if (Math.floor(error / 100) === 4){
              app.loginRegisteredUSer("");
              history.push({
                pathname: app.routes().signupdata, 
                state: {email: email}
              });
            } else {
              console.log(error);
              setErrorMsg(Client.errorMessageTranslation(error));
            }
            setOnRequest(false);
        });
      } catch (error) {
        console.log(error);
        setErrorMsg(Auth.errorMessageTranslation(error));
        setOnRequest(false);
      };
    } else {
      alert("Error en email o contraseña.");
    }
  }

  function isDialogOpen() {
    return errorMsg.detail !== "";
  }

  function closeDialog() {
    setErrorMsg({status: "", detail: ""});
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
       <DialogResponse
                open={isDialogOpen()}
                handleClose={closeDialog}
                status={errorMsg.status}
                errorMsg={errorMsg.detail}
            />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
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
                onChange={event => setEmail(event.target.value)}
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
                onChange={event => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Confirmar contraseña"
                type="password"
                required
                fullWidth
                value={confPassword}
                onChange={event => setConfPassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            disabled={onRequest}
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