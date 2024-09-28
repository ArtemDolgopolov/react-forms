# react-forms

React forms project features a comprehensive application with three main routes: a Main route that links to two different form approaches, and two routes dedicated to forms using uncontrolled components and React Hook Form. The project employs Redux to manage and store data collected from both forms, enabling easy access and display of user input on the Main route.

## Features
### Main Route:
- Contains links to both form routes.
- Displays submitted data using tiles, sourced from the Redux store.
### Forms:
- Collect the same fields, including:
- Name: Validates to start with an uppercase letter.
- Age: Must be a positive number.
- Email: Validated for proper email format.
- Passwords: Two fields that must match, with strength validation (requirements for numbers, uppercase letters, lowercase letters, and special characters).
- Gender: Selected using radio buttons or a dropdown.
- Terms and Conditions: Checkbox to confirm agreement.
- Picture Upload: Validates file size and format (PNG, JPEG), saving the image as a base64 string in Redux.
- Country Selection: Autocomplete control for country selection, with a predefined list stored in Redux.
### Validation:
- Utilizes Yup for schema validation.
- Displays errors consistently either above or below inputs.
- Disables form submission until all validation errors are resolved.
- Uncontrolled components validate on submission; React Hook Form supports live validation.
### Post-Submission Behavior:
- Redirects users to the Main route upon successful submission, displaying their data.
- Temporarily highlights newly entered data for easy identification.

## Technologies Used

- React
- TypeScript
- Vite
- React Hook Form
- Yup
- Redux Toolkit
- React Router

## Installation

To run the React Forms locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/React-forms.git`
2. Navigate to the project directory: `cd React-forms`
3. Install the dependencies: `npm install`
4. Run the app: `npm run dev`
