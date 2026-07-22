import CourseStudentRepository from "../repositories/CourseStudentRepository.js";


export async function listCourseStudents(req, res) {

    try {

        const data = await CourseStudentRepository.findAll();

        return res.json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Error obteniendo matrículas"
        });

    }

}



export async function listStudentsByCourse(req, res) {

    try {

        const data = await CourseStudentRepository.findByCourse(
            req.params.id
        );

        return res.json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Error obteniendo estudiantes del curso"
        });

    }

}



export async function listCoursesByStudent(req, res) {

    try {

        const data = await CourseStudentRepository.findByStudent(
            req.params.id
        );

        return res.json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Error obteniendo cursos del estudiante"
        });

    }

}



export async function createCourseStudent(req, res) {

    try {

        const {
            course_id,
            student_id,
            status = "active"
        } = req.body;


        if (!course_id || !student_id) {

            return res.status(400).json({
                message: "Curso y estudiante son requeridos"
            });

        }


        const enrollment =
            await CourseStudentRepository.create({
                course_id,
                student_id,
                status
            });


        return res.status(201).json(enrollment);


    } catch (error) {

        console.error(error);


        return res.status(500).json({
            message: "Error creando matrícula"
        });

    }

}