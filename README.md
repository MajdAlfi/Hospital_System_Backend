# Hospital_System_Backend
 
Backend was build using node.js and mongodb as the database
Folder Name: HospitalSystem

 The backend contains config folder which handles the connection to mongodb and to google cloud servers to upload the images and reports.

The models folder shape the database of the system having diagnosis, financials, img , otpModel, report, tasks, user.

The .env contains all the key typically its kept separate and not uploaded with the folder.
The index is the main page and the app is used to create the urls for the api.

Routes folder contains user which has Auth for logging  in and registering functionalities, get to get the user data and OTP has not been implemented into the front end but the backend is ready it used whatsapp messaging using meta developers account for the purpose of security the api keys have been removed from the .env folder.

All the apis are fully secured and everyone can access them as they use middleware function to check the JWTToken created when logging in or registering and it expires every 3d and refreshes automatically to ensure full security in the middle ware function it check. The credibility of  JWT Token and matches it with the user id from the database to ensure that no other individual will be access the data as for the account type it has also been integrated with the token and when decoded we check the account type to ensure that only specific account types have access to the data and access to upload and change the data.

Tasks backend wise its not fully implemented it can be used as standards for the tasks being performed and to manage the cost of the diagnosis better.

Report this folder contains the gets and post request responsible for getting the data to generate the report and to post it to google cloud. IMGSystem used to upload the images and the diagnosis as the same time as well as getting the data back. Financialsystem used to get and post all the data related to payments. diagnosis is mainly used to fetch the diagnosis.

When the user is registered the password is encrypted for security reasons.
