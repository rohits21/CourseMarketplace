import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide course title"],
            minLength: [4, "Title must be of ateast 4 characters."],
            maxLenngth: [80, "Title must be of maximum lenngth 80."]
        },

        description: {
            type: String,
            required: [true, "Please enter course title"],
            minLength: [20, "Title must be at least 20 characters"],
        },

        lectures: [
            {
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                video: {
                    public_id: {
                        type: String,
                        required: true
                    },
                    url: {
                        type: String,
                        required: true
                    }
                },

            }
        ],

        poster: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },

        views: {
            type: Number,
            default: 0,
        },
        numOfVideos: {
            type: Number,
            default: 0,
        },
        category: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            required: [true, "Enter Course Creator Name"],
        }

    },
    { timestamps: true })

export const Course = mongoose.model("Course", courseSchema);