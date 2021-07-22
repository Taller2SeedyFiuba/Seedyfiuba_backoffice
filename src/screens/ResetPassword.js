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
    const history = useHistory();

    function _setEmail(event) {
        setEmail(event.target.value);
    }

    function tryResetPassword() {
        Auth.sendPasswordResetEmail(email).then( function() {
            alert(`Mensaje de reseteo de contraseña enviado a: ${email}`);
            history.push(app.routes().login);
        }).catch(error => alert(Auth.errorMessageTranslation(error)));
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
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
                onChange={_setEmail}
            />
            <Button
                // type="submit"
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