import { sqlSubject } from './sql-curriculum.js';
import { excelSubject } from './excel-curriculum.js';
import { tableauSubject } from './tableau-curriculum.js';
import { powerBiSubject } from './power-bi-curriculum.js';
import { pythonSubject } from './python-curriculum.js';
import { statisticsSubject } from './statistics-curriculum.js';

export const curriculumSubjects = [
  sqlSubject,
  excelSubject,
  tableauSubject,
  powerBiSubject,
  pythonSubject,
  statisticsSubject,
].sort((a, b) => a.order - b.order);

export {
  sqlSubject,
  excelSubject,
  tableauSubject,
  powerBiSubject,
  pythonSubject,
  statisticsSubject,
};
