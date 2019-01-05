import React from 'react';
import AuthHeader from '../../../../src/api/server/lib/auth-header';
import { themeSettings, text } from '../../lib/settings';
import Lscache from 'lscache';
import Login from './login';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
	}

	handleFormSubmit = values => {
		let cartLayer = false;
		if (
			this.props.location !== undefined &&
			this.props.location.state !== undefined
		) {
			if (
				this.props.location.state.cartLayer &&
				Lscache.get('auth_data') === null
			) {
				cartLayer = true;
			}
		}

		this.props.loginUser({
			email: values.email,
			password: AuthHeader.encodeUserPassword(values.password),
			history: this.props.history,
			cartLayer: cartLayer
		});
	};

	render() {
		const {
			settings,
			customerproperties,
			cartlayerBtnInitialized
		} = this.props.state;

		if (this.props.state.customerproperties !== undefined) {
			console.log('customerproperties2');
			console.log(this.props.state.customerproperties);
			if (this.props.state.customerproperties.authenticated) {
				const expiryMilliseconds = 1000; //time units is seconds
				console.log('customerproperties1');
				console.log(this.props.state.customerproperties);
			}
			if (this.props.state.customerproperties.authenticated) {
				const expiryMilliseconds = 1000; //time units is seconds
				Lscache.setExpiryMilliseconds(expiryMilliseconds);
				Lscache.set(
					'auth_data',
					this.props.state.customerproperties.token,
					600
				);
			}
		}

		const {
			checkoutInputClass = 'checkout-field',
			checkoutButtonClass = 'checkout-button',
			checkoutEditButtonClass = 'checkout-button-edit'
		} = themeSettings;

		return (
			<Login
				inputClassName={checkoutInputClass}
				buttonClassName={checkoutButtonClass}
				editButtonClassName={checkoutEditButtonClass}
				settings={settings}
				customerproperties={customerproperties}
				cartlayerBtnInitialized={cartlayerBtnInitialized}
				readOnly={true}
				onSubmit={this.handleFormSubmit}
			/>
		);
	}
}
