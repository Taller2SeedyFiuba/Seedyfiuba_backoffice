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
import {app} from '../app/app'
import {useHistory} from "react-router-dom";
import * as Auth from '../provider/auth-provider'
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
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

export function Login() {
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    async function trySignIn() {  // CHEQUEAR O CAMBIAR
        try {
            await Auth.signInWithMailAndPassword(email, password);
            let token = await Auth.getIdToken(true);
            app.loginUser(token);
            Client.getUserData(token).then((resp) => {
                app.loginRegisteredUSer(resp.id);
                history.push(app.routes().users);
            }).catch((error) => {
                if (Math.floor(error / 100) === 4){
                    app.loginRegisteredUSer("");
                    history.push({
                      pathname: app.routes().signupdata, 
                      state: {email: email}
                    });
                } else {
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        };
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
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
            <Button
                // type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={trySignIn}
            >
                INGRESAR
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href={app.routes().resetpassword} variant="body2">
                    Recuperar contraseña
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