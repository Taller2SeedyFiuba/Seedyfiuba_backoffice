import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Title from './Title';
import {useHistory} from "react-router-dom";
import {app} from '../app/app'

export default function UsersList(props) {
  const [users, setUsers] = React.useState();
  const history = useHistory();

  const viewUser = (id) => {
    history.push(app.routes().users + '/' + id);
  }

  React.useEffect(() => {
    if (props.data) {
      let users = props.data.map(function(x) {
        return {
          id: x.id, 
          firstname: x.firstname, 
          lastname: x.lastname, 
          email: x.email,
        };
      });
      setUsers(users);
    }
  }, [props.data]);

  return (
    <React.Fragment>
      <Title>Usuarios</Title>
      <Table size='medium'>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>ID</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        {users ? 
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell><Button onClick={() => viewUser(user.id)}>...</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
          : 
          <></>
        }
      </Table>
    </React.Fragment>
  );
}