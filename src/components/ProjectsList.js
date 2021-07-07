import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  root: {
    margin: 45
  },
});

export default function ProjectsList(props) {
  const [projects, setProjects] = React.useState();
  const classes = useStyles();

  React.useEffect(() => {
    if (props.data) {
      let projects = props.data.map(function(x) {
        return {
          id: x.id, 
          ownerid: x.ownerid, 
          title: x.title, 
          type: x.type, 
          state: x.state, 
          location: x.location,
          icon: x.icon
        };
      });
      setProjects(projects);
    }
  }, [props.data]);

  return (
    <React.Fragment>
        {projects ? 
          <div style={{alignItems:'center', justifyContent:'center', alignSelf:'center', justifySelf:'center'}}>
            {projects.map((project) => (
              <Card className={classes.root}> 
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={project.icon}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Ubicación: {project.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Categoría: {project.type}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Etapa: {project.state}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      ID Propietario: {project.ownerid}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
          : 
          <></>
        }
    </React.Fragment>
  );
}