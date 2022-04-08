import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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
const Verify = styled.button`
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
const TagLine = styled.div`
    display:  flex;
    flex-direction: row;
    align-items: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #202020;
`
const Number = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: #387DD1;
`

const OTPInput = (props) => {
    const history = useHistory()
    const [otp, setOtp] = useState()
    const onVerifyHandler = () => {
        if(otp.length !== 4) {
            toast.error("OTP should be 4 digits", {
                duration: 2000, position: "top-center"
            })
            return
        }
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            mobileNumber: props.mobileNumber,
            otp: parseInt(otp)
        })
        .then((res) => {
            console.log(res.data.accessToken)
            localStorage.setItem('accessToken', res.data.accessToken)
            toast.success("OTP verified", {
                duration: 2000, position: "top-center"
            })
            history.push('/')
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.response.data.message, {
                duration: 2000, position: "top-center"
            })
        })
    }
    return (
        <Container>
            <Name onChange={(e) => {setOtp(e.target.value)}} placeholder="OTP" maxLength={4}></Name>
            <Verify onClick={onVerifyHandler}>Verify</Verify>
            <TagLine>we have sent you a OTP on&nbsp;<Number>+91 {props.mobileNumber}</Number></TagLine>
        </Container>
    )
}

export default OTPInput