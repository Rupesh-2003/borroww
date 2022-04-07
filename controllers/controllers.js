const Borrow = require('../models/borrowModel')
const jwt = require('jsonwebtoken')
const fast2sms = require('fast-two-sms')

const Signup = async (req, res) => {
    const { name, gender, mobileNumber } = req.body
    try {
        const user = await Borrow.findOne({mobileNumber: mobileNumber})
        if(user) {
            return res.status(400).json({message: "Mobile number already registered"})
        }
        var otp = Math.floor(1000 + Math.random() * 9000);
        const borrow = new Borrow({
            name: name,
            gender: gender,
            mobileNumber: mobileNumber,
            borrowRequests: [],
            otp: otp
        })
        await borrow.save()
        var options = {
            authorization: process.env.FAST_TWO_SMS_KEY,
            message: `${otp} is your OTP to log in Borrow`,
            numbers: [mobileNumber]
        }
        fast2sms.sendMessage(options)
        .catch((error) => {
            return res.status(400).json({message: "Account Created but failed to send OTP"})
        })
    }
    catch(error) {
        return res.status(400).json({message: error})
    }
    return res.status(200).json({message: "Account created successfully"})
}
const SendOTP = async (req, res) => {
    const {mobileNumber} = req.body
    let user
    try {
        user = await Borrow.findOne({mobileNumber: mobileNumber})
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        var otp = Math.floor(1000 + Math.random() * 9000);
        user.otp = otp
        await user.save()
        var options = {
            authorization: process.env.FAST_TWO_SMS_KEY,
            message: `${otp} is your OTP to log in Borrow`,
            numbers: [mobileNumber]
        }
        fast2sms.sendMessage(options)
        .catch((error) => {
            return res.status(400).json({message: "failed to send OTP"})
        })
        return res.status(200).json({message: "OTP sent"})
    }
    catch(error) {
        return res.status(400).json({message: error})
    }
}
const Login = async (req, res) => {
    const { mobileNumber, otp } = req.body
    let user 
    try {
        user = await Borrow.findOne({mobileNumber: mobileNumber})
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        if(user.otp !== otp) {
            return res.status(400).json({message: "OTP not matched"})
        }
        const jwtObj = {
            mobileNumber: user.mobileNumber
        }
        const accessToken = jwt.sign(jwtObj, process.env.JWT_KEY)
        return res.status(200).json({accessToken: accessToken})
    } catch(error) {
        return res.status(400).json({message: error})
    }
}

const AddBorrowRequest = async (req, res) => {
    const { mobileNumber, borrowRequest } = req.body
    let user
    try {
        user = await Borrow.findOne({mobileNumber: mobileNumber})
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
        user.borrowRequests.push({
            ...borrowRequest,
            createdAt: new Date()
        })
        await user.save()
    }
    catch(error) {
        return res.status(400).json({message: error})
    }
    return res.status(200).json({message: "Borrow request added successfully!"})
}

const GetBorrowRequests = async (req, res) => {
    const { mobileNumber } = req.body
    let user
    try {
        user = await Borrow.findOne({mobileNumber: mobileNumber})
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }
    }
    catch(error) {
        return res.status(400).json({message: error})
    }
    return res.status(200).json({borrowRequests: user})
}

exports.Signup = Signup
exports.SendOTP = SendOTP
exports.Login = Login
exports.AddBorrowRequest = AddBorrowRequest
exports.GetBorrowRequests = GetBorrowRequests