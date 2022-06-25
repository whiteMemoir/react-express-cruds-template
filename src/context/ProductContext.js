import axios from "axios";
import { useState, useEffect, createContext } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);

	const getProducts = () => {
		axios
			.get("http://localhost:3003/api/mongo/v2")
			.then((res) => setProducts(res.data))
			.catch((err) => console.log(err));
	};

	const addProduct = (formData) => {
		axios
			.post("http://localhost:3003/api/mongo/v2/", formData)
			.then((res) => console.log("success :", res))
			.catch((err) => console.log(err));
	};

	const updateProduct = (id, formData) => {
		axios
			.put(`http://localhost:3003/api/mongo/v2/${id}`, formData)
			.then((res) => console.log("success :", res))
			.catch((err) => console.log(err));
	};

	const deleteProduct = (id) => {
		// window.confirm("Lanjut menghapus?");
		axios
			.delete(`http://localhost:3003/api/mongo/v2/${id}`)
			.then((res) => console.log("success :", res))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getProducts();
		// fetch("http://localhost:3003/api/mongo/v2")
		// 	.then((res) => res.json())
		// 	.then((res) => setProducts(res));
	}, []);

	return (
		<ProductContext.Provider
			value={{ products, addProduct, updateProduct, deleteProduct }}
		>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductContext;
