//@ts-nocheck
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { TeacherModel } from '../database/teacherschema';
import { StudentModel } from '../database/studentschema';
import { courseModel } from '../database/courseschema'; // Import your course model
dotenv.config();

const teacherrouter = express.Router();

teacherrouter.get('/getuser', async (req, res) => {
    const token = req.cookies.jwt; // Retrieve token from cookies

    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET) as { id: string };
        const userId = decoded.id;

        // Fetch the teacher from the database
        const teacher = await TeacherModel.findById(userId);

        if (!teacher) {
            return res.status(404).json({ msg: 'Teacher not found' });
        }

        return res.status(200).json({ teacher });
    } catch (error) {
        console.error('Error fetching teacher:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ msg: 'Invalid token' });
        }
        return res.status(500).json({ msg: 'Internal server error' });
    }
});



teacherrouter.get('/search', async (req, res) => {
    const { query } = req.query;  // Retrieve search query from the request query params
    try {
        // Search for teachers by name or email
        const teachers = await TeacherModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // case-insensitive match for name
                { email: { $regex: query, $options: 'i' } }, // case-insensitive match for email
            ]
        });

        if (!teachers.length) {
            return res.status(404).json({ message: 'No teachers found' });
        }

        return res.status(200).json({ teachers });
    } catch (error) {
        console.error('Error searching teachers:', error);
        return res.status(500).json({ message: 'Server error, please try again later' });
    }
});


// Create a new course (Only teachers can create courses)
teacherrouter.post('/create-course', async (req, res) => {
    const { title, description, tags, price, schedule, difficulty } = req.body;
    // Your logic to create a course
    res.status(201).json({ msg: 'Course created successfully' });
});

// Add other teacher-specific routes here...

export default teacherrouter;
