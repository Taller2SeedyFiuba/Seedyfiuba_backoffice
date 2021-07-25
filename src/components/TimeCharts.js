import React from 'react';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 350,
    },
  }));

export default function TimeCharts(props) {
  const theme = useTheme();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (<>
    <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
            <React.Fragment>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={6}>
                       <Title>Nuevos Usuarios</Title>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Tiempo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={props.intervalUsers}
                                onChange={event => props.setIntervalUsers(event.target.value)}
                            >
                                <MenuItem value={'hour'}>Día</MenuItem>
                                <MenuItem value={'day'}>Mes</MenuItem>
                                <MenuItem value={'month'}>Año</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    width={500}
                    height={300}
                    data={props.userMetrics.usershistory}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="metric" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </React.Fragment>
        </Paper>
    </Grid>
    <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
            <React.Fragment>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={6}>
                       <Title>Nuevos Proyectos</Title>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Tiempo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={props.intervalProjects}
                                onChange={event => props.setIntervalProjects(event.target.value)}
                            >
                                <MenuItem value={'hour'}>Día</MenuItem>
                                <MenuItem value={'day'}>Mes</MenuItem>
                                <MenuItem value={'month'}>Año</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    width={500}
                    height={300}
                    data={props.projectMetrics.projectshistory}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="metric" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </React.Fragment>
        </Paper>
    </Grid></>
  );
}