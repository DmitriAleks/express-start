import express from 'express'

export const app = express()
const port = 3000

export const HTTP_STATUSES = {
    OK200: 200,
    CREATED_201: 201,
    NO_CONTENT: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND: 404,
}

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)


const db = {
    courses: [
        {id: 0, title: 'front-end1111'},
        {id: 1, title: 'back-end2121'},
        {id: 2, title: 'front-end3'},
        {id: 3, title: 'back-end4'},
        {id: 4, title: 'test-end5'}
    ],
}

app.get('/courses', (req, res) => {
    let foundCoursesQuery = db.courses
    if (req.query.title) {
        foundCoursesQuery = foundCoursesQuery.filter(c => c.title.indexOf(req.query.title as string) > -1)
    }
    if (!foundCoursesQuery.length) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND);
        return;
    }
    res.status(HTTP_STATUSES.OK200)
    res.json(foundCoursesQuery)
})
app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id);

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
        return
    }
    res.json(foundCourse)
})
app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }

    let createdCurs = {
        id: +(new Date()),
        title: req.body.title
    };
    db.courses.push(createdCurs)
    res.status(HTTP_STATUSES.CREATED_201)
    res.json(createdCurs)
})
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT)
})
app.put('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id);

    if(!req.body.title){
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        return
    }

    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND)
        return
    }
    foundCourse.title = req.body.title
    res.sendStatus(HTTP_STATUSES.NO_CONTENT )
})

app.delete('/__test__/data', (req, res) => {
    db.courses = []
    res.sendStatus(HTTP_STATUSES.NO_CONTENT)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})