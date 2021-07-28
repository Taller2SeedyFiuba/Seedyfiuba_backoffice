import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useHistory} from "react-router-dom";
import {app} from '../app/app'
import * as Auth from '../provider/auth-provider'
import DialogResponse from '../components/DialogResponse';

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
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

export function ResetPassword() {
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [onRequest, setOnRequest] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState({status: "", detail: ""});
    const history = useHistory();

    function tryResetPassword() {
        setOnRequest(true);

        Auth.sendPasswordResetEmail(email).then( function() {
            alert(`Mensaje de reseteo de contraseña enviado a: ${email}`);
            history.push(app.routes().login);
            setOnRequest(false);
        }).catch(error => {
            console.log(error);
            setErrorMsg(Auth.errorMessageTranslation(error));
            setOnRequest(false);
        });
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
        <DialogResponse
            open={isDialogOpen()}
            handleClose={closeDialog}
            status={errorMsg.status}
            errorMsg={errorMsg.detail}
        />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Recuperar Constraseña
            </Typography>
            <form className={classes.form} noValidate>
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
            <Button
                disabled={onRequest}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={tryResetPassword}
            >
                ENVIAR MAIL
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href={app.routes().login} variant="body2">
                    Ingresar
                </Link>
                </Grid>
                <Grid item>
                <Link href={app.routes().signup} variant="body2">
                    Registrarse
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
    );
}