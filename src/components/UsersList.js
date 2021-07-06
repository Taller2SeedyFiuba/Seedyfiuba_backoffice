import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

export default function UsersList(props) {
  const [users, setUsers] = React.useState();

  React.useEffect(() => {
    if (props.data) {
      let users = props.data.map(function(x) {
        return {
          id: x.id, 
          firstname: x.firstname, 
          lastname: x.lastname, 
          birthdate: x.birthdate, 
          email: x.email, 
          signindate: x.signindate
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
            <TableCell>Fecha de Ingreso</TableCell>
            <TableCell>Fecha de Nacimiento</TableCell>
          </TableRow>
        </TableHead>
        {users ? 
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.signindate}</TableCell>
                <TableCell>{user.birthdate}</TableCell>
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