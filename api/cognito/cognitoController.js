// cognitoController.js
const { Auth } = require('aws-amplify');
const AWS = require('aws-sdk');
const { CognitoIdentityProviderClient, AuthFlowType, InitiateAuthCommand, RespondToAuthChallengeCommand } = require("@aws-sdk/client-cognito-identity-provider");
const config = require('../config');


const client = new CognitoIdentityProviderClient({
  region: config.AWS_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
});

async function login(req, res) {
    try {
        const { username, password } = req.body;
        
    
      const command = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password
        },
        ClientId: config.USER_POOL_APP_CLIENT_ID, 
      });
      console.log(command);
      const response = await client.send(command);

      // Handle the response and send it back in the response body
      res.status(200).json(response);
    } catch (error) {
      // Handle errors and send an appropriate response
      if (error.name === 'InvalidParameterException') {
        console.log('Invalid parameter:', error.message);}
    }
  }

  async function verifyLogin(req, resp) {
    const { code, username, session } = req.body;
    console.log(username);
  
    const input = {
      ClientId: config.USER_POOL_APP_CLIENT_ID,
      ChallengeName: 'CUSTOM_CHALLENGE',
      Session: session,
      ChallengeResponses: {
        ANSWER: code,
        USERNAME: username,
      },
    };
  
    const command = new RespondToAuthChallengeCommand(input);
  
    try {
      const response = await client.send(command);
      console.log(response)
      resp.status(200).json(response);
    } catch (error) {
      // Handle errors and send an appropriate response
      if (error.name === 'InvalidParameterException') {
        console.log('Invalid parameter:', error.message);
      }
      resp.status(500).json({ error: error.message });
    }
  }
  
  

// Sign In
async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    const user = await Auth.signIn(username, password);
    res.status(200).json({ message: 'User signed in successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error signing in', error });
  }
}

// Confirm Sign Up
async function confirmSignUp(req, res) {
  try {
    const { username, confirmationCode } = req.body;
    await Auth.confirmSignUp(username, confirmationCode);
    res.status(200).json({ message: 'Sign up confirmed' });
  } catch (error) {
    res.status(400).json({ message: 'Error confirming sign up', error });
  }
}

async function signUp(req, res) {
    try {
      const { username, password, attributes } = req.body;
      const signUpOptions = {
        username,
        password,
        attributes,
      };
  
      const signUpResponse = await Auth.signUp(signUpOptions);
      res.status(200).json({ message: 'User signed up successfully', signUpResponse });
    } catch (error) {
      res.status(400).json({ message: 'Error signing up', error });
    }
  }

// Sign Out
async function signOut(req, res) {
  try {
    await Auth.signOut();
    res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error signing out', error });
  }
}

module.exports = {
  signIn,
  confirmSignUp,
  signUp,
  signOut,
  login,
  verifyLogin,
};
