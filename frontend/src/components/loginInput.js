import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast'
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 130px;
`
const NumberContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 360px;
    height: 50px;
    border: solid #C4C4C4 1px;
    border-radius: 5px;
    font-family: Inter;
    font-weight: 400;
    font-size: 24px;
    color: #404040;
`
const Label = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 66px;
    height: 100%;
    border-right: solid #C4C4C4 1px;
`
const Input = styled.input`
    width: 260px;
    height: 95%;
    border: none;
    outline: none;
    padding-left: 20px;
    font-family: Inter;
    font-weight: 400;
    font-size: 24px;
    color: #404040;
    ::placeholder,
    ::-webkit-input-placeholder {
        font-family: Inter;
        font-weight: 400;
        font-size: 24px;
        color: #606060;
    }
    :-ms-input-placeholder {
        font-family: Inter;
        font-weight: 400;
        font-size: 24px;
        color: #606060;
    }
`
const SignIn = styled.button`
    width: 170px;
    height: 50px;
    background-color: #387DD1;
    color: white;
    border-radius: 5px;
    border: none;
    outline: none;
    margin-top: 70px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    cursor: pointer;
`
const TagLine3 = styled.div`
    display:  flex;
    flex-direction: row;
    align-items: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #202020;
`
const SignUp = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: #387DD1;
`

const LoginInput = (props) => {
    const [number, setNumber] = useState('')

    const loginHandler = () => {
        if(number.length !==10) {
            toast.error("Number should be 10 digits", {
                duration: 2000, position: "top-center"
            })
            return
        }
        axios
        .post('http://localhost:9000/sendotp', {
            mobileNumber: number
        })
        .then((res) => {
            props.setMobileNumber(number)
            props.setState('otpverification')
            toast.success("OTP sent to your number", {
                duration: 2000, position: "top-center"
            })
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.response.data.message, {
                duration: 2000, position: "top-center"
            })
        })
    }

    return(
        <Container>
            <NumberContainer>
                <Label>+91</Label>
                <Input onChange={(e) => setNumber(e.target.value)} type="text" maxLength={10} placeholder="mobile number"></Input>
            </NumberContainer>
            <SignIn onClick={loginHandler}>Sign In</SignIn>
            <TagLine3>don’t have an account?&nbsp;<SignUp onClick={() => {props.setState('signup')}}>sign up</SignUp></TagLine3>
        </Container>
    )
}

export default LoginInput