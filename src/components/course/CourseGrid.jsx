import Grid from "@mui/material/Grid";
import CourseCard from "../common/CourseCard";

export default function CourseList() {
	const courses = ["html","css","javascript","Python"]
	return(
		<Grid className="flex flex-row mx-10 flex-wrap">
			{
			courses.map((item) => (
				<CourseCard item={item}/>
			))}
		</Grid>
	)
}