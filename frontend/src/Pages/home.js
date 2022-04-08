import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import BorrowCard from "../components/borrowCard";
import CreateBorrowRequest from "../components/createBorrowRequest";
import Navbar from "../components/navbar";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`
const SubContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: calc(100vh - 60px);
`
const BorrowCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    margin-top: 30px;
    overflow: auto;
    row-gap: 20px;
`
const CreateBorrowRequestContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    height: calc(100vh - 60px);
`
const TagLine = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    color: #404040;
`
const TagLine2 = styled.div`
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 38px;
    color: #404040;
`
const CreateRequest = styled.button`
    width: 300px;
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
    margin-top: 20px;
    margin-left: -40px;
`
const Logout = styled.button`
    width: 100px;
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
    font-size: 18px;
    margin-top: auto;
    margin-bottom: 30px;
    margin-right: 30px;
    margin-left: auto;
`

const Home = () => {
    const history = useHistory()
    const [data, setData] = useState()
    const [reload, setReload] = useState(false)    
    const [state, setState] = useState({
        amount: '',
        reason: '',
        duration: '',
        upiId: ''
    })

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if(!accessToken) {
            history.push('/login')
        }
        axios
            .get('http://localhost:9000/getBorrowRequests',{ 
                headers: {"Authorization" : `Bearer ${accessToken}`} 
            })
            .then((res) => {
                setData(res.data.borrowRequests)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [reload])

    const onCreateBorrowRequestHandler = () => {
        if(state.amount.length <= 0 || state.reason.length <=0 || state.duration.length <=0 || state.upiId.length <=0) {
            toast.error("Please fill all fields", {duration: 2000, position: "top-center"})
            return
        }
        const accessToken = localStorage.getItem('accessToken')
        const borrowRequest = state
        axios
        .post('http://localhost:9000/addBorrowRequest', {
            borrowRequest
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${accessToken}`,
            },
        })
        .then((res) => {
            toast.success("Borrow Request Added", {
                duration: 2000, position: "top-center"
            })
            setState({
                amount: '',
                reason: '',
                duration: '',
                upiId: ''
            })
            setReload(!reload)
        })
        .catch((error) => {
            toast.error(error.response.data.message, {
                duration: 2000, position: "top-center"
            })
        })
    }
    const onLogoutHandler = () => {
        localStorage.clear()
        setReload(!reload)
    }

    return (
        <Container>
            <Navbar/>
            <SubContainer>
                <BorrowCardContainer>
                    {data?.borrowRequests?.map(state => {
                        return (
                            <BorrowCard state={state}/>
                        )
                    })}
                </BorrowCardContainer>
                <CreateBorrowRequestContainer>
                    <TagLine>Need money?&nbsp;<TagLine2>just borrow it!</TagLine2></TagLine>
                    <CreateBorrowRequest
                        state={state}
                        setState={setState}
                    />
                    <CreateRequest onClick={onCreateBorrowRequestHandler}>Create Borrow Request</CreateRequest>
                    <Logout onClick={onLogoutHandler}>Logout</Logout>
                </CreateBorrowRequestContainer>
            </SubContainer>
        </Container>
    )
}

export default Home