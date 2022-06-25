import "./index.scss";
import { useEffect } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
	const pageNumber = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumber.push(i);
	}

	//MAsih kurang reaktif paginationnya
	return (
		<div>
			<ul className="pagination">
				{pageNumber.map((number) => (
					<li key={number} className="paginationItem">
						<span onClick={() => paginate(number)}>{number}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Pagination;
