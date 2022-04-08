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
    margin-top: 50px;
`
const Amount = styled.input`
    font-size: 24px;
    color: #404040;
    border: none;
    outline: none;
    ::placeholder,
    ::-webkit-input-placeholder {
        font-size: 24px;
        color: #404040;
    }
    :-ms-input-placeholder {
        font-size: 24px;
        color: #404040;
    }
`
const Reason = styled.input`
    font-size: 18px;
    line-height: 19px;
    color: #606060;
    margin-top: 6px;
    border: none;
    outline: none;
    ::placeholder,
    ::-webkit-input-placeholder {
        font-size: 18px;
        line-height: 19px;
        color: #606060;
    }
    :-ms-input-placeholder {
        font-size: 18px;
        line-height: 19px;
        color: #606060;
    }
`
const Duration = styled.input`
    font-size: 16px;
    line-height: 19px;
    color: #606060;
    margin-top: 24px;
    border: none;
    outline: none;
    ::placeholder,
    ::-webkit-input-placeholder {
        font-size: 16px;
    line-height: 19px;
    color: #606060;
    }
    :-ms-input-placeholder {
        font-size: 16px;
    line-height: 19px;
    color: #606060;
    }
`
const UPIId = styled.input`
    font-size: 16px;
    line-height: 19px;
    color: #606060;
    margin-top: 2px;
    border: none;
    outline: none;
    ::placeholder,
    ::-webkit-input-placeholder {
        font-size: 16px;
        line-height: 19px;
        color: #606060;
    }
    :-ms-input-placeholder {
        font-size: 16px;
        line-height: 19px;
        color: #606060;
    }
`
const CreateBorrowRequest = (props) => {
    
    return (
        <Card> 
            <Amount 
                value={props.state.amount} 
                onChange={(e) => {
                    props.setState({
                        ...props.state,
                        amount: e.target.value
                    })
                }} 
                placeholder="Amount"
            />
            <Reason 
                value={props.state.reason} 
                onChange={(e) => {
                    props.setState({
                        ...props.state,
                        reason: e.target.value
                    })
                }} 
                placeholder="reason"/>
            <Duration 
                value={props.state.duration} 
                type='number' 
                onChange={(e) => {
                    props.setState({
                        ...props.state,
                        duration: e.target.value
                    })
                }} 
                placeholder="Duration (in months)"></Duration>
            <UPIId 
                value={props.state.upiId} 
                onChange={(e) => {
                    props.setState({
                        ...props.state,
                        upiId: e.target.value
                    })
                }} 
                placeholder="upi Id"/>
        </Card>
    )
}

export default CreateBorrowRequest