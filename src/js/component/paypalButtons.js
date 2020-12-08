import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

export const PayPalButtons = props => {
	const [paid, setPaid] = useState(false);
	const [error, setError] = useState(null);
	const paypalRef = useRef();
	const history = useHistory();

	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions) => {
					return actions.order.create({
						intent: "CAPTURE",
						purchase_units: [
							{
								description: "Purchase from Seasons T-Shirts",
								amount: {
									currency_code: "USD",
									value: parseFloat(props.totalPrice)
								}
							}
						]
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();
					setPaid(true);
					console.log(order);
				},
				onError: err => {
					setError(err), console.log(err);
				}
			})
			.render(paypalRef.current);
	}, [props.totalPrice]);

	// If the payment has been made
	if (paid) {
		localStorage.setItem("cart", JSON.stringify([]));
		history.push("/");
		alert("Payment successful!");
		return <div>Payment successful!</div>;
	}

	// If any error occurs
	if (error) {
		return <div>An Error Occurred in processing payment! Please try again.</div>;
	}

	return (
		<div>
			<div ref={paypalRef} />
		</div>
	);
};
PayPalButtons.propTypes = {
	totalPrice: PropTypes.string
};
