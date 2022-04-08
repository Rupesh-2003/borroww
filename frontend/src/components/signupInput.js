import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 110px;
`
const Name = styled.input`
    width: 360px;
    height: 50px;
    padding-left: 20px;
    font-family: Inter;
    font-weight: 400;
    font-size: 24px;
    color: #404040;
    border: solid #C4C4C4 1px;
    border-radius: 5px;
    margin-bottom: 30px;
    box-sizing: border-box;
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
const Gender = styled.select`
    width: 360px;
    height: 50px;
    padding-left: 20px;
    font-family: Inter;
    font-weight: 400;
    font-size: 24px;
    color: #404040;
    border: solid #C4C4C4 1px;
    border-radius: 5px;
    margin-bottom: 30px;
    box-sizing: border-box;
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
    margin-bottom: 30px;
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
const SignUp = styled.button`
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
const SignIn = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: #387DD1;
`

const SignupInput = (props) => {
    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('male')

    const onSignupHandler = () => {
        if(number.length !== 10) {
            toast.error("Number should be 10 digits", {
                duration: 2000, position: "top-center"
            })
            return
        }
        if(!name.length >0 && !gender.length>0) {
            toast.error("Please check name and gender", {
                duration: 2000, position: "top-center"
            })
            return
        }
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
            name: name,
            mobileNumber: number,
            gender: gender
        })
        .then(() => {
            props.setMobileNumber(number)
            props.setState('otpverification')
            toast.success("OTP sent to your number", {
                duration: 2000, position: "top-center"
            })
        })
        .catch((error) => {
            toast.error(error.response.data.message, {
                duration: 2000, position: "top-center"
            })
        })
    }

    return(
        <Container>
            <Name onChange={(e) => {setName(e.target.value)}} placeholder="name" maxLength={25}></Name>
            <Gender value={gender} onChange={(e) => {setGender(e.target.value)}}>
                <option>male</option>
                <option>female</option>
            </Gender>
            <NumberContainer>
                <Label>+91</Label>
                <Input onChange={(e) => {setNumber(e.target.value)}} type="text" maxLength={10} placeholder="mobile number"></Input>
            </NumberContainer>
            <SignUp onClick={onSignupHandler}>Sign Up</SignUp>
            <TagLine3>have an account?&nbsp;<SignIn onClick={() => {props.setState('login')}}>sign in</SignIn></TagLine3>
        </Container>
    )
}

export default SignupInput