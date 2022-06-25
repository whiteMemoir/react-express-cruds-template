import { Link } from "react-router-dom";
import { useState } from "react";
import "./index.scss";
import ProductList from "../../components/shared/ProductList";

const Home = () => {
	const [searchInput, setSearchInput] = useState("");

	const searchHandler = (e) => {
		const searchValue = e.target.value.toLowerCase().trim();
		setSearchInput(searchValue);
	};

	return (
		<div className="main">
			<Link to="/tambah" className="btn btn-primary">
				Tambah Produk
			</Link>
			<div className="search">
				<input
					onChange={searchHandler}
					type="text"
					placeholder="Masukan kata kunci..."
				/>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th className="text-right">Price</th>
						<th className="text-center">Action</th>
					</tr>
				</thead>
				<ProductList searchInput={searchInput} />
			</table>
		</div>
	);
};

export default Home;
