import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartCard } from "../component/cartCard.js";
import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Cart = () => {
	const { store, actions } = useContext(Context);
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

	console.log(cart);
	// useEffect(() => {
	// 	function cartReducer(array) {
	// 		let reducedCart = Object.values(
	// 			array.reduce((total, curr) => {
	// 				let k = `${curr.size}|${curr.id}`;
	// 				// if (!total[k]) total[k] = { ...curr, count: 1 };
	// 				// else total[k].count += 1;
	// 				total[k].count += 1;
	// 				return total;
	// 			}, {})
	// 		);
	// 		return reducedCart;
	// 	}
	// 	setCart(cartReducer(cart));
	// 	console.log(cart);
	// }, []);
	// const reducedCart = Object.values(
	// 	cart.reduce((r, e) => {
	// 		let k = `${e.size}|${e.id}`;
	// 		if (!r[k]) r[k] = { ...e, count: 1 };
	// 		else r[k].count += 1;
	// 		return r;
	// 	}, {})
	// );

	// console.log(reducedCart);

	function deleteCartItem(index) {
		let newCart = cart.filter((product, idx) => idx !== index);
		localStorage.setItem("cart", JSON.stringify(newCart));
		setCart(newCart);
	}

	function getSubtotal() {
		let total = 0;
		cart.map(product => {
			let price = actions.getProduct(product.id).price * product.count;
			total = total + price;
		});
		return total;
	}

	let content = "";
	content = cart.map((product, index) => (
		<CartCard key={index} product={product} index={index} deleteCartItem={deleteCartItem} />
	));

	return (
		<div className="container blackBG text-light">
			<h2 className="text-center text-danger">Cart</h2>
			<div className="row">
				<div className="col-8">{content}</div>
				<div className="col-4 text-center">
					<div className="darkBG m-3">Login or Username</div>
					<div className="darkBG">
						<div>Subtotal ${getSubtotal().toFixed(2)}</div>
						<div>Shipping ${(cart.length * 5).toFixed(2)}</div>
						<div>Total ${(getSubtotal() + cart.length * 5).toFixed(2)}</div>
					</div>
					<button className="btn btn-danger rounded-pill btn-block mx-auto">Checkout with Paypal</button>
				</div>
			</div>
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
		</div>
	);
};
