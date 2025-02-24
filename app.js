require("dotenv").config();
require("./Config/databaseConnection").connect();
const express = require("express");
const path = require('path');
const app = express();
app.set('trust proxy', true);
app.use(express.json({limit: '50mb'}));
const login = require('./routes/User/Auth/login')
const register = require('./routes/User/Auth/register')
const otp = require('./routes/User/OTP/handilingOTP')
const getUserData = require('./routes/User/get/getUser')
const getAllPatients = require('./routes/User/get/gatAllPatients')
const uploadIMG = require('./routes/IMGSystem/post/uploadIMGToCloud')
const getDiagnosis = require('./routes/diagnosis/get/getPatientDiagnosis')
const getDiagnosisDetails = require('./routes/diagnosis/get/getDignosisDetails')
const saveReport = require('./routes/Report/post/saveReport')
const getReportData = require('./routes/Report/get/getReportData')
const getReportPatient = require('./routes/Report/get/getReportPatient')
const getNumberTransactions = require('./routes/FinancialSystem/get/getNumberOFTransactions')
const getNumberDiagnosis = require('./routes/diagnosis/get/getNumberOfDiagnosis')
const getPatientDiagnosisDetails = require('./routes/diagnosis/get/getDiagnosisDetailsPatient')
const getPatientPayments = require('./routes/FinancialSystem/get/getPaitientFinential')
const isPaid = require('./routes/FinancialSystem/post/isPaid')
const deleteUser = require('./routes/User/Auth/deleteUser')
const getUser = require('./routes/User/get/getAdminUsers')

app.use('/api/auth/login',login)
app.use('/api/auth/register',register)
app.use('/api/auth/otp',otp)
app.use('/api/userdata/user/data',getUserData)
app.use('/api/userdata/user/getAllPatients',getAllPatients)
app.use('/api/doctor/uploadIMG',uploadIMG)
app.use('/api/diagnosis/getDiagnosis',getDiagnosis)
app.use('/api/diagnosis/getDiagnosisDetails',getDiagnosisDetails)
app.use('/api/report/upload',saveReport)
app.use('/api/report/getReportData',getReportData)
app.use('/api/report/getReportPatient',getReportPatient)
app.use('/api/patient/getNumberTransactions',getNumberTransactions)
app.use('/api/patient/getNumberDiagnosis',getNumberDiagnosis)
app.use('/api/patient/getPatientDiagnosisDetails',getPatientDiagnosisDetails)
app.use('/api/patient/getPatientPayments',getPatientPayments)
app.use('/api/financial/setIsPaid',isPaid)
app.use('/api/auth/deleteUser',deleteUser)
app.use('/api/user/getUser',getUser)

module.exports = app;