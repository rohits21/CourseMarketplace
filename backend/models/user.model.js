import mongoose, {Schema, model} from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import crypto from "crypto"

const userSchema = new Schema(
    {
        name:{
            type: String,
            required : [true, "Please Enter your name"]
        },
        email:{
            type: String,
            required : [true, "Please Enter your email"],
            unique:true,
            validate: validator.isEmail
        },
        password:{
            type:String,
            required:[true, "Please enter your password"],
            minLength:[6, "Password must be atleast 6 characters"],
            select:false
        },
        Role:{
            type:String,
            enum: ["user", "admin"],
            default: "user"
            
        },
        Subscription:{
            id:String,
            status:String
        },
        avatar: {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },

        },
        playlist:[
            {
                course:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Course",
                },
                poster:String


            }
        ],

        resetPasswordToken:String,
        resetPasswordExpire:String


    }, 
    {timestamps:true});

    

    userSchema.pre("save", async function(next){

        if(this.isModified("password")){

            this.password = await bcrypt.hash(this.password, 10)
        }
        
        next()
    })

    userSchema.methods.getJwtToken = function(){
        return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
            expiresIn: "15d",
          });
    }

    userSchema.methods.comparePassword = async function(password){
        return await bcrypt.compare(password, this.password)
    }

    userSchema.methods.getResetToken = function(){
        const resetToken = crypto.randomBytes(20).toString("hex");

        this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        this.resetPasswordExpire = Date.now() + 15*60*1000
        return resetToken;
    }

export const User = model("User", userSchema)