const express = require('express');
const router = express.Router();
const cognitoController = require('./cognitoController');

// Sign In
router.post('/cognito/signin', cognitoController.login);

// Confirm Sign Up
router.post('/cognito/confirmSignUp', cognitoController.confirmSignUp);

// Sign Up
router.post('/cognito/signup', cognitoController.signUp);

// Sign Out
router.post('/cognito/signout', cognitoController.signOut);


module.exports = router