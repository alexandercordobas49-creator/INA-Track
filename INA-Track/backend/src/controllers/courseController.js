import { courseStatuses } from '../models/Course.js';
import { createId, readData, writeData } from '../data/store.js';

export function listCourses(req, res) {
  return res.json(readData().courses);
}

export function createCourse(req, res) {
  const data = readData();
  const { name, instructor, status = 'active' } = req.body;

  if (!name || !instructor) {
    return res.status(400).json({ message: 'Nombre e instructor son requeridos' });
  }

  if (!courseStatuses.includes(status)) {
    return res.status(400).json({ message: 'Estado de curso invalido' });
  }

  const course = {
    id: createId('course'),
    name,
    instructor,
    status,
    createdAt: new Date().toISOString()
  };

  data.courses.push(course);
  writeData(data);

  return res.status(201).json(course);
}
