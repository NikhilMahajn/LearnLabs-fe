import Grid from "@mui/material/Grid";
import CourseCard from "../common/CourseCard";
import { useState,useEffect,useContext } from "react";
import {Link} from "react-router-dom"
import { CourseListContext } from "../../pages/home";

export default function CourseList() {
	
	const courseList = useContext(CourseListContext)

	
	return (
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center gap-9 ">
				{courseList.map((item) => (
				<Link to={`/course/${item.slug}`}>
					<CourseCard course={item} />
				</Link>
				))}
			</div>
		);
}

