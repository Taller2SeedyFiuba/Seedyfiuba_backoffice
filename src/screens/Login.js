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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function Login() {
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    function _setEmail(event) {  // CHEQUEAR O CAMBIAR
        setEmail(event.target.value);
    }

    function _setPassword(event) {  // CHEQUEAR O CAMBIAR
        setPassword(event.target.value);
    }

    function trySignIn() {  // CHEQUEAR O CAMBIAR
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
            Sign in
            </Typography>
            <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                label="Email Address"
                type="email"
                required
                fullWidth
                autoFocus
                value={email}
                onChange={_setEmail}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Password"
                type="password"
                required
                fullWidth
                value={password}
                onChange={_setPassword}
            />
            <Button
                // type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={trySignIn}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                <Link href={app.routes().signup} variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
    );
}