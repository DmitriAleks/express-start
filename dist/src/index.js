"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 3000;
exports.HTTP_STATUSES = {
    OK200: 200,
    CREATED_201: 201,
    NO_CONTENT: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND: 404,
};
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware);
const db = {
    courses: [
        { id: 0, title: 'front-end1111' },
        { id: 1, title: 'back-end211' },
        { id: 2, title: 'front-end3' },
        { id: 3, title: 'back-end4' },
        { id: 4, title: 'test-end5' }
    ],
};
exports.app.get('/courses', (req, res) => {
    let foundCoursesQuery = db.courses;
    if (req.query.title) {
        foundCoursesQuery = foundCoursesQuery.filter(c => c.title.indexOf(req.query.title) > -1);
    }
    if (!foundCoursesQuery.length) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND);
        return;
    }
    //console.log('test14', foundCoursesQuery)
    res.sendStatus(exports.HTTP_STATUSES.OK200);
    res.json(foundCoursesQuery);
});
exports.app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND);
        return;
    }
    res.json(foundCourse);
});
exports.app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(exports.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    let createdCurs = {
        id: +(new Date()),
        title: req.body.title
    };
    db.courses.push(createdCurs);
    res.status(exports.HTTP_STATUSES.CREATED_201);
    res.json(createdCurs);
});
exports.app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT);
});
exports.app.put('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND);
        return;
    }
    foundCourse.title = req.body.title;
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT);
});
exports.app.delete('/__test__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
