import React from 'react';
import messages from 'lib/text';
import CezerinClient from 'cezerin-client';
import settings from 'lib/settings';
import * as auth from 'lib/auth';

import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: localStorage.getItem('dashboard_email') || '',
			isFetching: false,
			isAuthorized: false,
			emailIsSent: false,
			error: null,
			password: null
		};
	}

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	handleChange = event => {
		this.setState({
			email: event.target.value
		});
	};

	handleKeyPress = e => {
		if (e.keyCode === 13 || e.which === 13) {
			this.handleSubmit();
		}
	};

	handleSubmit = () => {
		this.setState({
			isFetching: true,
			isAuthorized: false,
			emailIsSent: false,
			error: null
		});

		CezerinClient.authorize(
			settings.apiBaseUrl,
			this.state.email,
			this.state.password
		)
			.then(authorizeResponse => {
				this.setState({
					isFetching: false,
					isAuthorized: false,
					emailIsSent: authorizeResponse.json.sent,
					error: authorizeResponse.json.error
				});
			})
			.catch(error => {
				this.setState({
					isFetching: false,
					isAuthorized: false,
					emailIsSent: false,
					error: error
				});
			});
	};

	componentWillMount() {
		auth.checkTokenFromUrl();
	}
	componentDidMount() {}

	render() {
		const {
			email,
			isFetching,
			password,
			isAuthorized,
			emailIsSent,
			error
		} = this.state;

		let response = null;
		if (isFetching) {
			response = (
				<div className="loginSuccessResponse">{messages.messages_loading}</div>
			);
		} else if (emailIsSent) {
			response = (
				<div className="loginSuccessResponse">{messages.loginLinkSent}</div>
			);
		} else if (emailIsSent === false && error) {
			response = <div className="loginErrorResponse">{error}</div>;
		}

		return (
			<div className="row col-full-height center-xs middle-xs">
				<div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
					<Paper className="loginBox" elevation={1}>
						<div className="loginTitle">{messages.signupTitle}</div>
						<div className="loginDescription">{messages.signupDescription}</div>
						<div className="loginInput">
							<TextField
								type="email"
								value={email}
								onChange={this.handleChange}
								onKeyPress={this.handleKeyPress}
								label={messages.email}
								fullWidth
								hintText={messages.email}
							/>
							<FormControl fullWidth>
								<InputLabel htmlFor="adornment-password">Password</InputLabel>
								<Input
									type={this.state.showPassword ? 'text' : 'password'}
									id="adornment-password"
									value={password}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="Toggle password visibility"
												onClick={this.handleClickShowPassword}
											>
												{this.state.showPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
							<br />
						</div>
						<RaisedButton
							label={messages.loginButton}
							primary={true}
							disabled={isFetching || emailIsSent}
							onClick={this.handleSubmit}
						/>
						<Button>
							<Link to="/admin/login">{messages.loginTitle}</Link>
						</Button>
						{response}
					</Paper>
				</div>
			</div>
		);
	}
}
