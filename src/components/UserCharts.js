import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, BarChart, Bar, Cell, CartesianGrid, Tooltip, Legend } from 'recharts';
import Title from './Title';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

export default function UserCharts(props) {
  const theme = useTheme();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const totalUsers = props.historicMetrics.usershistory.map(val => {return val.metric})
                          .reduce((accumulator, currentValue) => accumulator + currentValue)

  const totalSeers = props.historicMetrics.viewershistory.map(val => {return val.metric})
                          .reduce((accumulator, currentValue) => accumulator + currentValue)

  let usersData = [
      {type: 'totalUsers', metric: totalUsers},
      {type: 'seers', metric: totalSeers},
      {type: 'admins', metric: props.presentMetrics.actualadmins}
  ];

  return (
    <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
            <React.Fragment>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Title>Usuarios por Roles</Title>
                </Grid>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={500}
                    height={300}
                    data={usersData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="metric" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </React.Fragment>
        </Paper>
    </Grid>
  );
}