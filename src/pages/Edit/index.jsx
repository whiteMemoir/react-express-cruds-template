import { useHistory, useLocation, Link } from "react-router-dom";
import { useContext, useState } from "react";
import Input from "../../components/Input";
import ProductContext from "../../context/ProductContext";
import Upload from "../../components/Upload";

const Edit = () => {
	const { query } = useLocation();
	const { _id, name, price, stock, status, image } = query.productDetail;
	const { updateProduct } = useContext(ProductContext);
	const history = useHistory();
	const [itemInput, setItemInput] = useState({
		name,
		price,
		stock,
		status,
	});
	const [img, setImg] = useState(image);
	const [imagePreview, setImagePreview] = useState(image);

	const handleInput = (e) => {
		const { name, value, type, checked } = e.target;
		if (type === "file") {
			const file = e.target.files[0];
			setImg(file);
			setImagePreview(URL.createObjectURL(file));
		}
		if (type === "checkbox") {
			setItemInput((prevState) => ({
				...prevState,
				status: checked,
			}));
		}
		if (type === "text" || type === "number") {
			setItemInput((prevState) => ({ ...prevState, [name]: value }));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();

		formData.append("name", itemInput.name);
		formData.append("price", itemInput.price);
		formData.append("stock", itemInput.stock);
		formData.append("status", itemInput.status);
		formData.append("image", img);
		for (let [key, value] of formData.entries()) {
			console.log(key, value);
		}
		updateProduct(_id, formData);
		history.push("/");
		history.go(0);
	};

	return (
		<div className="main">
			<Link to="/" className="btn btn-primary">
				Kembali
			</Link>
			<div className="card">
				<h2>Edit Produk</h2>
				<br />
				<form onSubmit={handleSubmit}>
					<div key={_id}>
						<Input
							name="name"
							type="text"
							placeholder="Nama Produk..."
							label="Nama"
							defaultValue={name}
							onChange={handleInput}
						/>
						<Input
							name="price"
							type="number"
							placeholder="Harga Produk..."
							label="Harga"
							defaultValue={price}
							onChange={handleInput}
						/>
						<Input
							name="stock"
							type="number"
							placeholder="Stock Produk..."
							label="Stock"
							defaultValue={stock}
							onChange={handleInput}
						/>
						<Upload
							id="img"
							name="image"
							type="file"
							onChange={handleInput}
							img={imagePreview}
						/>
						<Input
							name="status"
							type="checkbox"
							label="Active"
							defaultChecked={status ? true : false}
							onChange={handleInput}
						/>
						<button type="submit" className="btn btn-primary">
							Edit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Edit;
