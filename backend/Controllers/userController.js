const User = require('../Models/userModel');
const asyncHandler = require('express-async-handler');
const GenerateToken = require('../Token/GenerateToken');
const { generateOTP, mailTransport, generateEmailTemplate, plainEmailTemplate } = require('../Mail/Mail');
const VerificationToken = require('../Models/verificationModel');
const { isValidObjectId } = require('mongoose');

const UserRegisterController = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const UserExists = await User.findOne({ email });

    if (UserExists) {
        res.status(400);
        throw new Error('User Already Exists!');
    }

    const UserCreate = await User.create({
        firstname, lastname, email, password
    });

    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
        owner: UserCreate._id,
        token: OTP
    })

    await verificationToken.save();

    mailTransport().sendMail({
        from: process.env.USERNAME,
        to: UserCreate.email,
        subject: "Verify your Email Account",
        html: generateEmailTemplate(OTP)
    })

    if (UserCreate) {
        res.status(201).json({
            _id: UserCreate._id,
            firstname: UserCreate.firstname,
            lastname: UserCreate.lastname,
            email: UserCreate.email,
            token: GenerateToken(UserCreate._id)
        })
    } else {
        res.status(400);
        throw new Error('Error Occuried!');
    }
});

const UserLoginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const UserExists = await User.findOne({ email });

    if (UserExists && (await UserExists.matchPassword(password))) {
        res.json({
            _id: UserExists._id,
            firstname: UserExists.firstname,
            lastname: UserExists.lastname,
            email: UserExists.email,
            token: GenerateToken(UserExists._id)

        })
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

});

const UserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.firstname = req.body.firstname || user.firstname;
        user.lastname = req.body.lastname || user.lastname;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            token: GenerateToken(updatedUser._id)
        })
    }
    else {
        res.status(404);
        throw new Error('User not Found');
    }

})

const VerifyEmail = asyncHandler(async (req, res) => {
    const { userid, otp } = req.body;

    if (!userid || !otp) {
        res.status(401);
        throw new Error('Invalid Request, missing Parameters');
    }

    if (!isValidObjectId(userid)) {
        res.status(401);
        throw new Error('Invalid user Id');
    }

    const user = await User.findById(userid);

    if (!user) {
        res.status(404);
        throw new Error('Sorry, user not found');
    }

    if (user.verified) {
        res.status(400);
        throw new Error('This account is already verified');
    }

    const token = await VerificationToken.findOne({ owner: user._id });

    if (!token) {
        res.status(404);
        throw new Error('Sorry, user not found');
    }

    const isMatched = await token.compareToken(otp);

    if (!isMatched) {
        res.status(400);
        throw new Error('Please provide a valid token');
    }

    user.verified = true;

    await VerificationToken.findByIdAndDelete(token._id);

    await user.save();

    mailTransport().sendMail({
        from: 'emailverification@gmail.com',
        to: user.email,
        subject: "Welcome to AppsDeployer",
        html: plainEmailTemplate("Email Verified Successfully", "Thanks for Connecting with AppsDeployer")
    })

    res.json({
        success: true,
        message: "Your email is Verified"
    })
})



module.exports = { UserRegisterController, UserLoginController, VerifyEmail, UserProfile };