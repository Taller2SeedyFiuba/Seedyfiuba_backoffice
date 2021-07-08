import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import { Link } from 'react-router-dom';
import {app} from '../app/app'

export default function ListItems() {
  return (
    <List component="nav">
      <ListItem button to={app.routes().users} component={Link} >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItem>
      <ListItem button to={app.routes().projects} component={Link} >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Proyectos" />
      </ListItem>
      <ListItem button component={Link} to={app.routes().servers} >
        <ListItemIcon>
          <DnsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Servidores" />
      </ListItem>
      <ListItem button component={Link} to={app.routes().metrics} >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Métricas" />
      </ListItem>
    </List>
  )
}