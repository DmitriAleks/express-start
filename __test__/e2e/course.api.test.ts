import request from 'supertest'
import {app, HTTP_STATUSES} from "../../src";


describe('/courses', () => {

    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })

    it('should return 200 and []', async () => {
        await request(app)
            .get('/courses')
            .expect(404)
    })

    it('should return 404 for existing course', async () => {
        await request(app)
            .get('/courses/99')
            .expect(404)
    })

    it('should`dont create course with correct input data', async () => {
        await request(app)
            .post('/courses')
            .send({
                title: ''
            })
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app)
            .get('/courses')
            .expect(404)
    })
    let createCourse: any = null;
    it('should create course with correct input data', async () => {
        const creatResponse = await request(app)
            .post('/courses')
            .send({
                title: 'my course'
            })
            .expect(HTTP_STATUSES.CREATED_201)

         createCourse = creatResponse.body

        expect(createCourse).toEqual({
            id: expect.any(Number),
            title: 'my course'
        })

        await request(app)
            .get('/courses')
            .expect(HTTP_STATUSES.OK200, [createCourse])
    })

    it('should`not update course with incorrect input data', async () => {
            await request(app)
            .put('/courses/' + createCourse.id)
            .send({
                title: ''
            })
            .expect(HTTP_STATUSES.BAD_REQUEST_400)

    })

    it('should`not update course thant no exict', async () => {
        await request(app)
            .put('/courses/' + 99)
            .send({
                title: '1231'
            })
            .expect(HTTP_STATUSES.NOT_FOUND)

    })

    it('should update course with incorrect input data', async () => {
        const creatResponse = await request(app)
            .put('/courses/' + createCourse.id)
            .send({
                title: 'goodTitle'
            })
            .expect(HTTP_STATUSES.NO_CONTENT)


        await request(app)
            .get('/courses/' + createCourse.id)
            .expect(HTTP_STATUSES.OK200, {
                ...createCourse, title : 'goodTitle'
            })

    })

    it('should delete course with incorrect input data', async () => {
        const creatResponse = await request(app)
            .delete('/courses/' + createCourse.id)
            .expect(HTTP_STATUSES.NO_CONTENT)


        await request(app)
            .get('/courses' )
            .expect(HTTP_STATUSES.NOT_FOUND)


    })
})