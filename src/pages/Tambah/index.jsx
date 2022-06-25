import { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import Input from "../../components/Input";
import Upload from "../../components/Upload";
import "./index.scss";
import ProductContext from "../../context/ProductContext";

const Tambah = () => {
	const { addProduct } = useContext(ProductContext);
	const history = useHistory();
	const [itemInput, setItemInput] = useState({
		name: null,
		price: null,
		stock: null,
		status: false,
		image: null,
	});
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const handleInput = (e) => {
		const { name, value, type, checked } = e.target;
		if (type === "file") {
			const file = e.target.files[0];
			setImage(file);
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
		formData.append("image", image);
		for (let [key, value] of formData.entries()) {
			console.log(key, value);
		}
		addProduct(formData);

		/*CATATAN UNTUK FETCH : 
			-DALAM KASUS INI KETIKA UPLOAD FILE BERHASIL KETIKA TANPA HEADER
			-multipart/form-data : ERROR MULTIPART BOUNDARY NOT FOUND
			-application/x-www-form-urlencoded : { WEBKITFORMBOUNDARYXXXXXX }
		*/
		// fetch("http://localhost:3003/api/mongo/v2", {
		// 	method: "POST",
		// 	body: formData,
		// })
		// 	.then((res) => res.json())
		// 	.then((res) => {
		// 		console.log("success :", res);
		// 	})
		// 	.catch((err) => console.log(err));
		history.push("/");
		history.go(0);
	};

	return (
		<div className="main">
			<Link to="/" className="btn btn-primary" >
				Kembali
			</Link>
			<div className="card">
				<h2>Tambah Produk</h2>
				<br />
				<form onSubmit={handleSubmit}>
					<Input
						name="name"
						type="text"
						placeholder="Nama Produk..."
						label="Nama"
						onChange={handleInput}
						required
					/>
					<Input
						name="price"
						type="number"
						placeholder="Harga Produk..."
						label="Harga"
						onChange={handleInput}
						required
					/>
					<Input
						name="stock"
						type="number"
						placeholder="Stock Produk..."
						label="Stock"
						onChange={handleInput}
						required
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
						onChange={handleInput}
						checked={itemInput.status}
					/>

					<button type="submit" className="btn btn-primary">
						Simpan
					</button>
				</form>
			</div>
		</div>
	);
};

export default Tambah;
