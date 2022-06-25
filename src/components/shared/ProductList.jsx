import { Link, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import ProductContext from "../../context/ProductContext";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Pagination from "../Pagination";

const ProductList = ({ searchInput }) => {
	const history = useHistory();
	const { products, deleteProduct } = useContext(ProductContext);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(7);

	const filteredData = products.filter((product) => {
		if (searchInput === "") {
			return products;
		} else {
			return product.name.toLowerCase().includes(searchInput);
		}
	});

	//get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPost = filteredData.slice(indexOfFirstPost, indexOfLastPost);

	//change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const deleteHandle = (id) => {
		confirmAlert({
			title: "Lanjut menghapus?",
			buttons: [
				{
					label: "Ya",
					onClick: () => {
						deleteProduct(id);
						history.go(0);
					},
				},
				{
					label: "Tidak",
				},
			],
		});
	};

	return (
		<>
			<tbody>
				{currentPost.map((product, index) => (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{product.name}</td>
						<td className="text-right">{product.price}</td>
						<td className="text-center">
							<Link
								to={{
									pathname: `/detail/${product._id}`,
									query: { productDetail: product },
								}}
								className="btn btn-sm btn-info"
							>
								Detail
							</Link>
							<Link
								to={{
									pathname: `/edit/${product._id}`,
									query: { productDetail: product },
								}}
								className="btn btn-sm btn-warning"
							>
								Edit
							</Link>
							<button
								onClick={() => deleteHandle(product._id)}
								className="btn btn-sm btn-danger"
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
			<Pagination
				postsPerPage={postsPerPage}
				totalPosts={products.length}
				paginate={paginate}
			/>
		</>
	);
};

export default ProductList;
