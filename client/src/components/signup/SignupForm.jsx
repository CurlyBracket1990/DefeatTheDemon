import React, {PureComponent} from 'react'

export default class SignupForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor="nickname">Nickname</label>
					<input type="nickname" name="nickname" id="nickname" value={
						this.state.nickname || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" value={
						this.state.password || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="confirmPassword">Confirm password</label>
					<input type="password" name="confirmPassword" id="confirmPassword" value={
						this.state.confirmPassword || ''
					} onChange={ this.handleChange } />
				</div>

				{
					this.state.password &&
					this.state.confirmPassword &&
					this.state.password !== this.state.confirmPassword &&
					<p style={{color:'red'}}>The passwords do not match!</p>
				}

				<button type="submit">Sign up</button>
			</form>
		)
	}
}
