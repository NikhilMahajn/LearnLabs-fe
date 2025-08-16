import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

export default function CourseCard(prop) {
  return (
    <Card sx={{ maxWidth: 400,minWidth: 400,minHeight: 250, boxShadow: 3, borderRadius: 3 }} className='m-10'>
  
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {prop.item}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a simple example of a Material UI card with an image, title, 
          and description. You can customize it easily.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium">Start Learning</Button>
      </CardActions>
    </Card>
  );
}
