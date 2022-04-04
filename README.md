## Introduction 

  A small web application that serves the Tweeter interface. It will support the following functionality:
• Allow the user to input and send messages.
• Display the user's messages.
• If a user's input is less than or equal to 50 characters, post it as is.
• If a user's input is greater than 50 characters, split it into chunks that each is less than or equal to 50 characters and post each chunk as a separate message.


## Enviroment 

  Nodejs 10.4.00+, npm 6.1.0+, yarn 1.7.0+ (recommend)


## Library

  Use declarative UI library React, build with react-scripts because it offers a modern build setup with no configuration (don’t need to install or configure tools like Webpack or Babel, suitable for small and middle deployments)
  Use node-sass for Sass Stylesheet
  Testing frameworks: 
     + Jest: testing framework developed by Facebook and built into react-scripts package
     + Enzyme: developed by Airbnb for testing React components
     + Puppeteer: node library which provides a high-level API to control Chrome or Chromium, used for testing end to end

Run `yarn` or `npm install` to install these libaries.

## Available Scripts

In the project directory, you can run:

## `yarn` or `npm install`
  Install node-modules pagkage, must be run script at first time 

### `yarn start` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test` or `npm start`

Launches the test runner in the interactive watch mode.<br>
See test coverage: npm test -- --coverage  , yarn test --coverage
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:e23` or `npm test:e2e`
Launches end to end test.<br>

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject` or `npm run eject`

**Note: this is a one-way operation. Once you `eject`,  can’t go back!**

Use `eject` when not satisfied with the build tool and configuration. This command will remove the single build dependency from your project. You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. 


## Advanced Configuration

See https://facebook.github.io/create-react-app/docs/advanced-configuration

## Deployment

See https://facebook.github.io/create-react-app/docs/deployment



## Futher enhancement
  Use react-i18next which is based on i18next,a powerful internationalization framework for localization
  Use react redux for state management, holds up the state within a single location when project is bigger, have more component use the same state
  Use fetch to call api submit message to server
