import { Link, useLocation } from "react-router-dom";
import "./index.scss";

const Detail = () => {
	const { query } = useLocation();
	const { _id, name, price, stock, status, image } = query.productDetail;

	return (
		<div className="main">
			<Link to="/" className="btn btn-primary">
				Kembali
			</Link>

			<table className="table">
				<tbody key={_id}>
					<tr>
						<td>ID</td>
						<td>: {_id}</td>
					</tr>
					<tr>
						<td>Name</td>
						<td>: {name}</td>
					</tr>
					<tr>
						<td>Price</td>
						<td>: {price}</td>
					</tr>
					<tr>
						<td>Stock</td>
						<td>: {stock}</td>
					</tr>
					<tr>
						<td>Status</td>
						<td>: {status === true ? "active" : "not active"}</td>
					</tr>
					<tr>
						<td>Image</td>
						<td>: {image && <img width="300" src={image} alt="" />}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Detail;
