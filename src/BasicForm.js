import React from 'react';
import ReactDOM from 'react-dom';

class BasicForm extends React.Component {
  static displayName = "basic-input";
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
    this.phoneRef = React.createRef();
    this.state = {
      names: [],
      email: '',
      phone: '',
      errors: {} // Object to hold field-level errors
    };
  }

  validateForm = () => {
    const { name, email, phone } = this.state;
    const errors = {};
    // Basic validation rules (you can add more specific validation as needed)
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number is invalid';
    }
    // Set state with errors
    this.setState({ errors });
    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value }, this.validateForm);
  };

  onFormSubmit = (evt) => {
    evt.preventDefault();
    if (this.validateForm()) {
      const { name, email, phone, names } = this.state;
      const newEntry = { name, email, phone };
      this.setState({
        names: [...names, newEntry],
        name: '',
        email: '',
        phone: ''
      });
    }
  };

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <input
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
              placeholder='Name'
              value={name}
              onChange={(e) => this.handleChange('name', e.target.value)}
            />
            {errors.name && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.name}</div>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              style={{ width: '100%', padding: '10px', fontSize: '16px', borderColor: errors.email ? 'red' : '' }}
              placeholder='Email'
              value={email}
              onChange={(e) => this.handleChange('email', e.target.value)}
            />
            {errors.email && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.email}</div>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              style={{ width: '100%', padding: '10px', fontSize: '16px', borderColor: errors.phone ? 'red' : '' }}
              placeholder='Phone'
              value={phone}
              onChange={(e) => this.handleChange('phone', e.target.value)}
            />
            {errors.phone && <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.phone}</div>}
          </div>

          <input type='submit' style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }} />
        </form>

        <div>
          <h3>Entries</h3>
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            { this.state.names.map((entry, i) => (
              <li key={i} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                <div style={{ marginBottom: '5px' }}>Name: {entry.name}</div>
                <div style={{ marginBottom: '5px' }}>Email: {entry.email}</div>
                <div>Phone: {entry.phone}</div>
              </li>
            )) }
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <BasicForm />,
  document.getElementById("root")
);

export default BasicForm;
