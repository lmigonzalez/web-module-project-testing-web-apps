import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {

	render( <ContactForm/>);


});

test('renders the contact form header', () => {

	render(<ContactForm/>)

	const formHeader = screen.getByText(/Contact Form/i);
	expect(formHeader).toBeInTheDocument()
	expect(formHeader).toBeTruthy()
	expect(formHeader).toHaveTextContent(/Contact Form/i)

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {

	render(<ContactForm/>)
	const firstName = screen.getByLabelText(/First Name*/i);
	userEvent.type(firstName, '123');

	const errorMessages = await screen.findAllByTestId('error');
	expect(errorMessages).toHaveLength(1)



});

test('renders THREE error messages if user enters no values into any fields.', async () => {

	render(<ContactForm/>)

	const submitBtn = screen.getByRole('button');
	userEvent.click(submitBtn);

	await waitFor(()=>{
		const errorMessages = screen.queryAllByTestId('error');
		expect(errorMessages).toHaveLength(3)
	})


});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {


	render(<ContactForm/>)

	const firstName = screen.getByLabelText(/first name*/i);
	userEvent.type(firstName, 'bertha')

	const lastName = screen.getByLabelText(/last name*/i);
	userEvent.type(lastName, 'gonzalez')

	const btn = screen.getByRole('button');
	userEvent.click(btn);

	const errorMessages = await screen.getAllByTestId('error');
	expect(errorMessages).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

	render(<ContactForm/>)

	const email = screen.getByLabelText(/Email*/i)
	userEvent.type(email, 'luisgonzalez@gmail')

	const errorMessage = await screen.findByText(/email must be a valid email address/i)
	expect(errorMessage).toBeInTheDocument()


});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

	render(<ContactForm/>)

	const btn = screen.getByRole('button');
	userEvent.click(btn);

	const errorMessage = await screen.findByText(/lastName is a required field/i);
	expect(errorMessage).toBeInTheDocument();


});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

	render(<ContactForm/>)

	const firstName = screen.getByLabelText(/first name*/i)
	const lastName = screen.getByLabelText(/last name*/i)
	const email = screen.getByLabelText(/Email*/i)

	 userEvent.type(firstName, 'bertha');
	 userEvent.type(lastName, 'gonzalez');
	 userEvent.type(email, 'luisgonzalez@gmail.com');

	 const btn = screen.getByRole('button');
	 userEvent.click(btn);

	 await waitFor(()=>{
		 const firstNameDisplay = screen.queryByText('bertha')
		 const lastNameDisplay = screen.queryByText('gonzalez')
		 const emailDisplay = screen.queryByText('luisgonzalez@gmail.com')
		 const msgDisplay = screen.queryByTestId('messangeDisplay')

		 expect(firstNameDisplay).toBeInTheDocument();
		 expect(lastNameDisplay).toBeInTheDocument();
		 expect(emailDisplay).toBeInTheDocument();
		 expect(msgDisplay).not.toBeInTheDocument();
	 })


});

test('renders all fields text when all fields are submitted.', async () => {


	render(<ContactForm/>)

	const firstName = screen.getByLabelText(/first name*/i)
	const lastName = screen.getByLabelText(/last name*/i)
	const email = screen.getByLabelText(/Email*/i)
	const messageField = screen.getByLabelText(/message/i)

	 userEvent.type(firstName, 'bertha');
	 userEvent.type(lastName, 'gonzalez');
	 userEvent.type(email, 'luisgonzalez@gmail.com');
	 userEvent.type(messageField, 'hello there');

	 const btn = screen.getByRole('button');
	 userEvent.click(btn);

	 await waitFor(()=>{
		 const firstNameDisplay = screen.queryByText('bertha')
		 const lastNameDisplay = screen.queryByText('gonzalez')
		 const emailDisplay = screen.queryByText('luisgonzalez@gmail.com')
		 const msgDisplay = screen.queryByText('hello there')

		 expect(firstNameDisplay).toBeInTheDocument();
		 expect(lastNameDisplay).toBeInTheDocument();
		 expect(emailDisplay).toBeInTheDocument();
		 expect(msgDisplay).toBeInTheDocument();
		 
	 })

});
