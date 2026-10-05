import { crearConexion } from './database/database.js';

import IdentificationTypesRepository from './repositories/identification-types.repository.js';
import CitiesRepository from './repositories/cities.repository.js';
import StudentsRepository from './repositories/students.repository.js';
import TeachersRepository from './repositories/teachers.repository.js';
import ClassroomsRepository from './repositories/classrooms.repository.js';
import CoursesRepository from './repositories/courses.repository.js';
import TopicsRepository from './repositories/topics.repository.js';
import CoursesSchedulesRepository from './repositories/courses-schedules.repository.js';
import InscriptionsRepository from './repositories/inscriptions.repository.js';
import RatesRepository from './repositories/rates.repository.js';

import IdentificationTypesService from './services/identification-types.service.js';
import CitiesService from './services/cities.service.js';
import StudentsService from './services/students.service.js';
import TeachersService from './services/teachers.service.js';
import ClassroomsService from './services/classrooms.service.js';
import CoursesService from './services/courses.service.js';
import TopicsService from './services/topics.service.js';
import CoursesSchedulesService from './services/courses-schedules.service.js';
import InscriptionsService from './services/inscriptions.service.js';
import RatesService from './services/rates.service.js';

import CrudCommand from './commands/crud.command.js';
import MenuCommand from './commands/menu.command.js';

const pool = crearConexion();

const repositories = {
  identificationTypes: new IdentificationTypesRepository(pool),
  cities: new CitiesRepository(pool),
  students: new StudentsRepository(pool),
  teachers: new TeachersRepository(pool),
  classrooms: new ClassroomsRepository(pool),
  courses: new CoursesRepository(pool),
  topics: new TopicsRepository(pool),
  coursesSchedules: new CoursesSchedulesRepository(pool),
  inscriptions: new InscriptionsRepository(pool),
  rates: new RatesRepository(pool)
};

const services = {
  identificationTypes: new IdentificationTypesService(repositories.identificationTypes),
  cities: new CitiesService(repositories.cities),
  students: new StudentsService(repositories.students),
  teachers: new TeachersService(repositories.teachers),
  classrooms: new ClassroomsService(repositories.classrooms),
  courses: new CoursesService(repositories.courses),
  topics: new TopicsService(repositories.topics),
  coursesSchedules: new CoursesSchedulesService(repositories.coursesSchedules),
  inscriptions: new InscriptionsService(repositories.inscriptions),
  rates: new RatesService(repositories.rates)
};

const entidades = [
  { nombre: 'Tipos de identificación', command: new CrudCommand(services.identificationTypes, 'tipo de identificación', 'tipos de identificación') },
  { nombre: 'Ciudades', command: new CrudCommand(services.cities, 'ciudad', 'ciudades') },
  { nombre: 'Estudiantes', command: new CrudCommand(services.students, 'estudiante', 'estudiantes') },
  { nombre: 'Maestros', command: new CrudCommand(services.teachers, 'maestro', 'maestros') },
  { nombre: 'Aulas', command: new CrudCommand(services.classrooms, 'aula', 'aulas') },
  { nombre: 'Cursos', command: new CrudCommand(services.courses, 'curso', 'cursos') },
  { nombre: 'Temas', command: new CrudCommand(services.topics, 'tema', 'temas') },
  { nombre: 'Horarios de cursos', command: new CrudCommand(services.coursesSchedules, 'horario de curso', 'horarios de cursos') },
  { nombre: 'Inscripciones', command: new CrudCommand(services.inscriptions, 'inscripción', 'inscripciones') },
  { nombre: 'Calificaciones', command: new CrudCommand(services.rates, 'calificación', 'calificaciones') }
];

const menu = new MenuCommand(entidades);

try {
  await menu.ejecutar();
} catch (error) {
  console.error(`Error de ejecución: ${error.message}`);
} finally {
  await pool.end();
}
