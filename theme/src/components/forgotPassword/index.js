import React from 'react';
import AuthHeader from '../../../../src/api/server/lib/auth-header';
import { themeSettings, text } from '../../lib/settings';
import Lscache from 'lscache';
import ForgotPassword from './forgotPassword';

export default class ForgotPasswordForm extends React.Component {
	constructor(props) {
		super(props);
	}

	handleFormSubmit = values => {
		this.props.loginUser({
			email: values.email,
			password: AuthHeader.encodeUserPassword(values.password),
			history: this.props.history
		});
	};

	render() {
		const { settings, customerproperties } = this.props.state;

		const {
			checkoutInputClass = 'checkout-field',
			checkoutButtonClass = 'checkout-button',
			checkoutEditButtonClass = 'checkout-button-edit'
		} = themeSettings;

		return (
			<ForgotPassword
				inputClassName={checkoutInputClass}
				buttonClassName={checkoutButtonClass}
				editButtonClassName={checkoutEditButtonClass}
				settings={settings}
				customerproperties={customerproperties}
				readOnly={true}
				onSubmit={this.handleFormSubmit}
			/>
		);
	}
}
