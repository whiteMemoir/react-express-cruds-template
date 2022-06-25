import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import { ProductProvider } from "./context/ProductContext";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Tambah from "./pages/Tambah";

const App = () => {
	return (
		<div>
			<ProductProvider>
				<BrowserRouter>
					<Navigation />
					<Switch>
						<Route path="/" exact children={() => <Home />} />
						<Route path="/detail/:id" children={() => <Detail />} />
						<Route path="/edit/:id" children={() => <Edit />} />
						<Route path="/tambah" children={() => <Tambah />} />
					</Switch>
				</BrowserRouter>
			</ProductProvider>
		</div>
	);
};

export default App;
