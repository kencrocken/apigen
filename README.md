# React, TailwindCSS, Tanstack React Table

Clone repository:
`git clone https://github.com/kencrocken/apigen.git`

Install dependencies:
`npm install`

![alt text](./public/screenshot.png 'screenshot')

A table is displayed of 'User' data. An actions column allows the user to 'Edit' and 'Delete' users.

Note, the user can edit Name, Email, Role, & Status. ID, Sign Up Date, and Last Login were excluded from the form because of UX concerns regarding editing ids, and log type entries.

Further, there is a speed bump modal when deleting a user; which prevents the user from 'shooting themselves in the foot.'

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Serves the built app from the `dist` folder on a local server.\
Visit [http://localhost:4173](http://localhost:4173) to view the production build of your app.

### `npm run lint`

Runs ESLint on your project's files to identify and report on patterns found in ECMAScript/JavaScript code.

### `npm run test`

Launches the test runner in the interactive watch mode.
