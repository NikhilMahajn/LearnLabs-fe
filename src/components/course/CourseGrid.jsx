import Grid from "@mui/material/Grid";
import CourseCard from "../common/CourseCard";
import { useState,useEffect } from "react";
import {Link} from "react-router-dom"
import { live_url } from "../../App";
export default function CourseList() {
	const courses = ["html","css","javascript","Python"]
	const [courseList, setCourseList] = useState([])
	 
	useEffect(()=>{
		async function fetch_courses(){
			console.log(`${live_url}/course/`)
			const data = await fetch(`${live_url}/course/`)
			const jsonData = await data.json()
			setCourseList(jsonData)
		}
		fetch_courses()
		console.log(courseList)
	},[]
)

	return (
    <Grid container spacing={2} >
      {courseList.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={4}>
			<Link to={`/course/${item.id}`}>
          		<CourseCard course={item} />
		  	</Link>
        </Grid>
      ))}
    </Grid>
  );

}