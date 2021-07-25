import React from 'react';
import { XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip, Legend } from 'recharts';
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

export default function ProjectCharts(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (<>
    <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
            <React.Fragment>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Title>Proyectos por Etapa</Title>
                </Grid>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={500}
                    height={300}
                    data={props.historicMetrics.projectsbystate}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="metric" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </React.Fragment>
        </Paper>
    </Grid>
    <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
            <React.Fragment>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Title>Proyectos por Categoría</Title>
                </Grid>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={500}
                    height={300}
                    data={props.historicMetrics.projectsbytype}
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
    </Grid></>
  );
}