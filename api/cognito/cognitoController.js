// cognitoController.js
const { Auth } = require('aws-amplify');
const AWS = require('aws-sdk');
const { CognitoIdentityProviderClient, AuthFlowType, InitiateAuthCommand } = require("@aws-sdk/client-cognito-identity-provider");


const { ListUserPoolsCommand } = require("@aws-sdk/client-cognito-identity-provider");

async function login(req, res) {
    try {
        const { username } = req.body;
        const client = new CognitoIdentityProviderClient({
            region: 'us-east-1',
            credentials: {
              accessKeyId: 'AKIAQZ3PILW22EEOVBCR',
              secretAccessKey: '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',
            },
          });
          

    
      const command = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.CUSTOM_AUTH,
        AuthParameters: {
          USERNAME: username
        },
        ClientId: '39rsuvtfgo83c32o8718iuqftg', 
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
};
