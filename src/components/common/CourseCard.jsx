import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
export default function CourseCard({course}) {
  return (
   <Card
        sx={{
          width: { xs: "100%", sm: 350, md: 400, lg: 430 }, // responsive widths
          minHeight: 250,
          boxShadow: 3,
          borderRadius: 3,
          m: 2, // margin shorthand
        }}
    >
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      {course.title}
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
