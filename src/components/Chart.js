import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { Grid } from '@material-ui/core';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

const raw_times = ['hoy', 'mes', 'año'];

const times = raw_times.map((element) => {
    return { label: element.charAt(0).toUpperCase() + element.slice(1), value: element }
})

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >
        <Title>Today</Title>
        <TextField
          variant="outlined"
          margin="normal"
          label="Categoría"
        //   type="text"
          select
          required
          fullWidth
          autoFocus
          // value={type}
          // onChange={_setType}
          size='small'
          style={{marginLeft:20, width:'50%'}}
        >
          {times.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
          ))}
        </TextField>
      </Grid>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}