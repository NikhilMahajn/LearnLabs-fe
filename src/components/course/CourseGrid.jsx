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
			const data = await fetch(`${live_url}/course/`)
			const jsonData = await data.json()
			setCourseList(jsonData)
		}
		fetch_courses()
		console.log(courseList)
	},[]
)

	return (
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center gap-9 ">
		{courseList.map((item) => (
		<Link to={`/course/${item.id}`}>
			<CourseCard course={item} />
		</Link>
		))}
	</div>
);


}