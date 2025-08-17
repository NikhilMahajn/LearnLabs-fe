import Grid from "@mui/material/Grid";
import CourseCard from "../common/CourseCard";
import { useState,useEffect } from "react";

export default function CourseList() {
	const courses = ["html","css","javascript","Python"]
	const [courseList, setCourseList] = useState([])
	
	const api_url = 'http://127.0.0.1:8000'
	const live_url = 'https://learnlabs-be.onrender.com'
	useEffect(()=>{
		async function fetch_courses(){
			const data = await fetch(`${live_url}/course/`)
			const jsonData = await data.json()
			setCourseList(jsonData)
		}
		fetch_courses()
		console.log(courseList)
	},[]
)

	return (
    <Grid container spacing={2}>
      {courseList.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={4}>
          <CourseCard course={item} />
        </Grid>
      ))}
    </Grid>
  );

}