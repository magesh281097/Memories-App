import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Container, Grid, Paper, Button, Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import Icon from './Icon'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import {signin, signup} from '../../actions/auth'



const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
function Auth() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setSignUp] = useState(false)
    const history = useNavigate()
    const [formData, setFormData] = useState(initialState)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        if(isSignUp){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState)
    }

    const switchMode = () => {
        setSignUp((prevState) => !prevState)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = () => {
        console.log('Login Failed')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h6">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email" type="email" handleChange={handleChange} />
                        <Input name="password" label="Password" type={showPassword ? 'text' : 'password'} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                        {isSignUp && (
                            <Input name="confirmPassword" label="Repeat Password" type="password" handleChange={handleChange} />
                        )}
                    </Grid>
                    <Button type="submit" fullWidth color="primary" variant="contained" className={classes.submit}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    <GoogleLogin
                        clientId="1022796487466-ecedjahhsekrdp9ruhf8i8tonq5trnn8.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                onClick={renderProps.onClick}
                                // disabled={renderProps.disabled}
                                fullWidth
                                startIcon={<Icon />}
                                variant="contained"
                            >Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : 'Dont have an account Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
