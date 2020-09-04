import React from "react";
import { render, fireEvent, act, prettyDOM } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from "./App";
import ContactForm from "./components/ContactForm";

const breakthetest= () => {
  throw new Error()
};

test("renders App without crashing", () => {
  render(<App />);
  // breakthetest()
});

//
test("ContactForm accepts inputs", async () => {
  //Ideas to test:
//   if you can add input values
// input is displaying as typed/state is updated?
// firstName needs to be minLength, not maxLength
// Validation: email no error message
// Submit: returns properly & displays

  const { getByTestId, getByLabelText, findByTestId } = render(<ContactForm />);

  const User = {
    firstName: "Josuah",
    lastName: "Mateo",
    email: "stranger@mail.com",
    message: "Toodle-oo honey \"says josh\""
  };


  const firstName = getByTestId("firstName");
  userEvent.type(firstName, User.firstName);
  expect(firstName.value).toBe(User.firstName)
  // expect(firstName.nextSibling).toBe(null)
  //this is where I would look for validation, except that it's async
  //this would also repeat after each of the ones below.

  const lastName = getByLabelText("Last Name*");
  userEvent.type(lastName, User.lastName);
  expect(lastName.value).toBe(User.lastName)

  const email = getByTestId("email");
  fireEvent.change(email, {target: {value: User.email}});
  expect(email.value).toBe(User.email)

  const message = getByTestId("message");
  fireEvent.change(message, {target: {value: User.message}});
  expect(message.value).toBe(User.message)


  const submitOnForm = getByTestId("submit")
  act(() => {fireEvent.click(submitOnForm)});
  //getByText runs before changes to DOM (early)
  //findByText runs asyncronous (after the submit above)
    //and makes sure that the exact string we created of dummy data is being displayed on the screen.
    //have to tell jest when we're doing asyncronous things, or jest will finish the test too early.
    //this does now do what we want, but the stringifies aren't matching:
    // await findByText(JSON.stringify(User, null, 2))//makes sure the data I expect is on the screen.
    // await findByText(/\{"firstName":"Jo","lastName":"Mateo","email":"stranger@mail.com","message":"Toodle-oo honey"\}/)
  const result = await findByTestId("result") //the result will capture the pre element bitts
    // console.log(result)
  expect(result.textContent).toBe(JSON.stringify(User))
    // console.log(prettyDOM(container));
  //JS does weird with stringify, and are unordered, and this isn't a good thing to depend on doing what we expect.
  //combined logic that should be broken into smaller steps:
    //
});

// also spec and __test__ to look up

//CANNOT TEST THIS WITHOUT ASYNCRONOUS BC THE react-hook-form IS ASYNC & IS THE VALIDATION.