import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {app} from '../app/app'
import {useHistory} from "react-router-dom";
import * as Auth from "../provider/auth-provider"
import * as Client from '../provider/client-provider'

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

export function SignUpData() {
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const history = useHistory();

  function _setFirstName(event) {  // CHEQUEAR O CAMBIAR
    setFirstName(event.target.value);
  }

  function _setLastName(event) {  // CHEQUEAR O CAMBIAR
    setLastName(event.target.value);
  }

  function _setBirthDate(event) {  // CHEQUEAR O CAMBIAR
    setBirthDate(event.target.value);
  }

  // CAMBIAR LO DE EMAIL Y PONER EMAIL EN APP, ACTUALIZAR EN AUTH EL EMAIL DE APP
  // CAMBIAR PICKER DATE POR PICKER BUENO Y DAR VUELTA EL FORMATO DE LA FECHA

  function trySignUpData() {  // CHEQUEAR O CAMBIAR
    const data = {
      email : window.location.state.email,
      firstname : firstName,
      lastname : lastName, 
      birthdate : birthDate
    };
    Client.sendUserData(app.getToken(), data).then((resp) => {
      app.loginRegisteredUSer(resp.id);
      history.push(app.routes().users);
    })
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
                value={firstName}
                onChange={_setFirstName}
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
                value={lastName}
                onChange={_setLastName}
            />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Fecha de Nacimiento"
                type="date"
                required
                fullWidth
                autoFocus
                value={birthDate}
                onChange={_setBirthDate}
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={trySignUpData}
          >
            REGISTRARSE
          </Button>
        </form>
      </div>
    </Container>
  );
}