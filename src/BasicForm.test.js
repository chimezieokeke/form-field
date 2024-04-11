import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import BasicForm from './BasicForm';

test('renders sign-up form with inputs', () => {
  const { getByPlaceholderText } = render(<BasicForm />);
  expect(getByPlaceholderText('Name')).toBeInTheDocument();
  expect(getByPlaceholderText('Email')).toBeInTheDocument();
  expect(getByPlaceholderText('Phone')).toBeInTheDocument();
});

test('adds a new entry when form is submitted with valid inputs', () => {
  const { getByPlaceholderText, getByText, getByLabelText } = render(<BasicForm />);
  const nameInput = getByPlaceholderText('Name');
  const emailInput = getByPlaceholderText('Email');
  const phoneInput = getByPlaceholderText('Phone');
  const submitButton = getByText('Submit');

  fireEvent.change(nameInput, { target: { value: 'Chimi Okeke' } });
  fireEvent.change(emailInput, { target: { value: 'chimokeke@gmail..com' } });
  fireEvent.change(phoneInput, { target: { value: '4044320709' } });
  fireEvent.click(submitButton);

  expect(getByText('Name: Chimi Okeke')).toBeInTheDocument();
  expect(getByText('Email: chimokeke@gmail.com')).toBeInTheDocument();
  expect(getByText('Phone: 4044320709')).toBeInTheDocument();
});

test('does not add a new entry when form is submitted with invalid inputs', () => {
  const { getByText } = render(<BasicForm />);
  const submitButton = getByText('Submit');

  fireEvent.click(submitButton);

  expect(getByText('Entries').nextSibling).toBeNull();
});
