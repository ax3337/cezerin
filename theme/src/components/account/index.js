import React from 'react';
import { Redirect } from 'react-router-dom';
import Lscache from 'lscache';
import { themeSettings, text } from '../../lib/settings';
import AuthHeader from '../../../../src/api/server/lib/auth-header';
import Account from './account';

export default class AccountForm extends React.Component {
	constructor(props) {
		super(props);
	}

	handleCustomerProperties = () => {
		this.props.customerData({
			token: Lscache.get('auth_data')
		});
	};

	handleFormSubmit = values => {
		const { shipping_address, billing_address } = values;
		this.props.changeCustomerProperties({
			first_name: values.first_name,
			last_name: values.last_name,
			email: values.email,
			password: AuthHeader.encodeUserPassword(values.password),
			token: Lscache.get('auth_data'),
			shipping_address,
			billing_address,
			history: this.props.history
		});

		this.props.updateCart({
			shipping_address: shipping_address,
			billing_address: billing_address,
			payment_method_id: null,
			shipping_method_id: null
		});
	};

	render() {
		const {
			settings,
			customerproperties,
			initialValues,
			cartlayerBtnInitialized
		} = this.props.state;

		Lscache.flushExpired();

		if (
			Lscache.get('auth_data') === null &&
			this.props.state.customerproperties === undefined
		) {
			Lscache.flush();
			return (
				<Redirect
					to={{
						pathname: '/login'
					}}
				/>
			);
		} else {
			const cacheTimeStamp = localStorage.getItem(
				'lscache-auth_data-cacheexpiration'
			);
			if (Number(cacheTimeStamp) <= Math.floor(new Date().getTime() / 1000)) {
				Lscache.flush();
				return (
					<Redirect
						to={{
							pathname: '/login'
						}}
					/>
				);
			}

			const {
				checkoutInputClass = 'checkout-field',
				checkoutButtonClass = 'checkout-button',
				checkoutEditButtonClass = 'checkout-button-edit'
			} = themeSettings;

			return (
				<Account
					inputClassName={checkoutInputClass}
					buttonClassName={checkoutButtonClass}
					editButtonClassName={checkoutEditButtonClass}
					settings={settings}
					customerproperties={
						customerproperties || this.handleCustomerProperties()
					}
					initialValues={initialValues}
					cartlayerBtnInitialized={cartlayerBtnInitialized}
					onSubmit={this.handleFormSubmit}
				/>
			);
		}
	}
}
