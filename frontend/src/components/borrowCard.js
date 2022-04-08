import styled from "styled-components";
const Card = styled.div`
    width: 300px;
    min-height: 160px;
    border: 1px solid #C4C4C4;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    padding: 20px;
`
const Amount = styled.div`
    font-size: 24px;
    color: #404040;
`
const Reason = styled.div`
    font-size: 18px;
    line-height: 19px;
    color: #606060;
    margin-top: 6px;
`
const Duration = styled.div`
    font-size: 16px;
    line-height: 19px;
    color: #606060;
    margin-top: 24px;
`
const UPIId = styled.div`
    font-size: 16px;
    line-height: 19px;
    color: #606060;
    margin-top: 2px;
`
const CreatedAt = styled.div`
    font-size: 12px;
    line-height: 14px;
    color: #606060;
    margin-top: 24px;
`

const BorrowCard = (props) => {
    return (
        <Card> 
            <Amount>Rs. {props?.state.amount}</Amount>
            <Reason>{props?.state.reason}</Reason>
            <Duration>Duration: &nbsp; {props?.state.duration} months</Duration>
            <UPIId>upi Id:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {props?.state.upiId}</UPIId>
            <CreatedAt>request created at: {props?.state.createdAt}</CreatedAt>
        </Card>
    )
}

export default BorrowCard