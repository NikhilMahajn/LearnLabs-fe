import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

export default function CourseCard({course}) {
  return (
    <Card sx={{ maxWidth: 450,minWidth: 350,minHeight: 250, boxShadow: 3, borderRadius: 3 }} className='m-10'>
  
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium">Start Learning</Button>
      </CardActions>
    </Card>
  );
}
