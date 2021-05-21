import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firbase.config';
import "./RegisterForm.css";
import { Form } from 'react-bootstrap';
import { UseContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
else {
    firebase.app();
}

const RegisterForm = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const [user, setUser] = useState({
        name: '',
        email: '',
        success: '',
        error: '',
        password:'',
        confirmPassword:''
    });



    const [newUser, setNewUser] = useState(true);
    const [logInUser, setLogInUser] = useContext(UseContext)

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [errors, setErrors] = useState(false)

    //GoogleSignIn 
    const handleGoogleSignIn = () => {

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var { displayName, email } = result.user;
                const logInUSer = { name: displayName, email: email }
                setLogInUser(logInUSer);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var credential = error.credential;
                console.log(errorMessage, credential);
            });
    }

    // FB Sign In
    const handleFbSignIn = () => {

        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;

                var accessToken = credential.accessToken;
                var { displayName, email } = result.user;
                const loginUse = { name: displayName, email: email }
                setLogInUser(loginUse);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorMessage, errorCode, credential);
            });
    }

    const handleBlur = (e) => {
        let isValid = true;

        if (e.target.name === "email") {
            isValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === "password" && e.target.name === "confirmPassword") {
            isValid = e.target.value.length > 6;

        }

        if (isValid) {
            const loginUser = { ...user };
            loginUser[e.target.name] = e.target.value;
            setUser(loginUser);
        }
    }


    // Sign Up With email and password
    
    const handleSubmit = (e) => {

        if (newUser && user.password !== user.confirmPassword ) {    
            setErrors(true)
        }
        
        else if (user.password === user.confirmPassword) {
            setErrors(false)
        }
        

        if (newUser && user.email && user.password === user.confirmPassword) {

            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const { displayName, email } = userCredential.user;
                    const signUpUser = { name: displayName, email: email, success: true };
                    setUser(signUpUser);
                    updateUserNameHandler(user.name);
                   
                })

                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const userInfo = { ...user }
                    userInfo.success = '';
                    userInfo.error = errorMessage;
                    setUser(userInfo);
                });
        }

        // Log In With Number And Password

        if (!newUser && user.email && user.password) {

            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const userDetails = userCredential.user;
                    const userInfo = { ...user };
                    userInfo.error = '';
                    userInfo.success='';
                    userInfo.name = userDetails.displayName;
                    setUser(userInfo)
                    setLogInUser(userInfo)
                    history.replace(from);
                })
                .catch((error) => {
                  
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const userInfo = { ...user }
                    userInfo.success = '';
                    userInfo.error = errorMessage;
                    setUser(userInfo);
                    
                });

        }
        e.preventDefault();
    }

    // Update userName
    const updateUserNameHandler = (name) => {

        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        })
            .then(function () {
            }).catch(function (error) {

            });
    }

    return (
        <>
            <div className="error-handle">
                {
                    user.success && <h3 > Sign Up has been successful.</h3>
                }
                {
                    errors && <p style={{ color: 'red' }}>Password Don't Match</p>
                }
                <p>{user.error}</p>
            </div>

            <div className="from">
                <div style={{ textAlign: 'center' }}>
                    <form className="register-form" onSubmit={handleSubmit}>
                        {
                            newUser ? <h2>Sign Up</h2> : <h2> Log In</h2>
                        }
                        {newUser ?
                            <div>
                                <Form.Control name="name" onBlur={handleBlur} type="text" placeholder="Write Name" required /> <br />
                                <Form.Control name="email" onBlur={handleBlur} type="email" placeholder="Enter email" required /> <br />
                                <Form.Control name="password" onBlur={handleBlur} type="password" placeholder="Password" required /> <br />
                                <Form.Control name="confirmPassword" onBlur={handleBlur} type="password" placeholder="
                                      Confirm Password" required /> <br />

                                <input type="submit" className="btn btn-warning" value="Create an account" /> <br /><br />
                                <p>Already have an account ? <span className="login" onClick={() => setNewUser(false)}>Login</span></p>
                            </div> :
                            <div>
                                <Form.Control name="email" onBlur={handleBlur} type="email" placeholder="Enter email" required /> <br />
                                <Form.Control name="password" onBlur={handleBlur} type="password" placeholder="Password" required /> <br />

                                <input type="submit" className="btn btn-warning" value="Log In" /><br /><br />
                                <p>Don't have an account ? <span className="login" onClick={() => setNewUser(true)}>Create an account</span></p>

                            </div>
                        }
                    </form>
                </div>
            </div>

            <div className="sign-with-pop">
                <p>Or</p>
                <button className="btn btn-danger" onClick={handleGoogleSignIn}> <FontAwesomeIcon icon={faGoogle} /> Continue with Google</button>
                <button className="btn btn-primary" onClick={handleFbSignIn}> <FontAwesomeIcon icon={faFacebook} />  Continue with Facebook</button>
            </div>

        </>

    );
};

export default RegisterForm;