import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {app} from '../app/app'
import {useHistory} from "react-router-dom";
import DialogResponse from '../components/DialogResponse';
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
  const [onRequest, setOnRequest] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState({status: "", detail: ""});
  const history = useHistory();

  function trySignUpData() {
    setOnRequest(true);
    let email = app.getEmail();

    const data = {
      email : email,
      firstname : firstName,
      lastname : lastName, 
      birthdate : birthDate
    };
    Client.sendUserData(app.getToken(), data).then(resp => {
      app.loginRegisteredUSer(resp.id);
      history.push(app.routes().users);
      setOnRequest(false);
    }).catch(error => {
      console.log(error);
      setErrorMsg(Client.errorMessageTranslation(error));
      setOnRequest(false);
    })
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
                onChange={event => setFirstName(event.target.value)}
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
                onChange={event => setLastName(event.target.value)}
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
                onChange={event => setBirthDate(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            disabled={onRequest}
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