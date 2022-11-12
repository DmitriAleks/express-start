"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../../src");
describe('/courses', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).delete('/__test__/data');
    }));
    it('should return 200 and []', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses')
            .expect(404);
    }));
    it('should return 404 for existing course', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses/99')
            .expect(404);
    }));
    it('should`dont create course with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/courses')
            .send({
            title: ''
        })
            .expect(src_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses')
            .expect(404);
    }));
    it('should create course with correct input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const creatResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/courses')
            .send({
            title: 'my course'
        })
            .expect(src_1.HTTP_STATUSES.CREATED_201);
        const createdCourse = creatResponse.body;
        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: 'my course'
        });
        yield (0, supertest_1.default)(src_1.app)
            .get('/courses')
            .expect(src_1.HTTP_STATUSES.OK200, [createdCourse]);
    }));
});
