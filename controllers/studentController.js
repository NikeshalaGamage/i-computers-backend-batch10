import Student from "../models/student.js";

export function createStudent(req,res){
    const newStudent = new Student({
        name: req.body.name,
        age :req.body.age,
        city :req.body.city,

    });
    newStudent.save().then(()=>{
        res.json({ message: "student created Successfully",

        });

    });

}

export function getStudents(req,res){
    Student.find().then(
        (students)=>{
            res.json(students)
        }
    )
}