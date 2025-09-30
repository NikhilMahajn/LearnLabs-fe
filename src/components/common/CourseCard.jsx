import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
export default function CourseCard({course}) {
  return (
      <Card
        sx={{
          width: "100%",
          height: "100%",   // match parent
          minHeight: 280,   // good base height
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: 3,
          borderRadius: 3,
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
    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
        Start Learning
    </button>
  </CardActions>
</Card>

  );
}
