import React, { useState } from 'react'
import Navbar from '../components/navbar'
import styled from 'styled-components'
import LoginInput from '../components/loginInput'
import SignupInput from '../components/signupInput'
import OTPInput from '../components/otpInput'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
`
const TagLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Rubik;
    font-size: 40px;
    color: #303030;
    margin-top: 110px;
`
const TagLine2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Rubik;
    font-size: 24px;
    color: #606060;
    margin-top: 10px;
`

const Login = () => {
    const [state, setState] = useState('login') //login signup otpverification
    const [mobileNumber, setMobileNumber] = useState()
    return (
        <Container>
            <Navbar/>
            <TagLine>Borrow money from sharks</TagLine>
            <TagLine2>we have a community of generous lenders who help needy people</TagLine2>
            {state === 'login'&&
                <LoginInput state={state} setState={setState} setMobileNumber={setMobileNumber}/>
            }
            {state === 'signup'&&
                <SignupInput state={state} setState={setState} setMobileNumber={setMobileNumber}/>
            }
            {state === 'otpverification' &&
                <OTPInput state={state} setState={setState} mobileNumber={mobileNumber}/>
            }
        </Container>
    )
}

export default Login