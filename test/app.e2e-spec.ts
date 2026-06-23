import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { CreateMovieDTO } from '../src/movies/dto/create-movie.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    await app.init();
  });

  describe("/", () => {
    it("GET", () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Welcome to my Movie API');
    });
  });

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([]);
    });

    it("POST", () => {
      const data:CreateMovieDTO = {
          title: "Test",
          year: 2000,
          genres: []
        };

      return request(app.getHttpServer())
        .post("/movies")
        .send(data)
        .expect(201);
    });

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404);
    });
  });

  describe("/movies/:id", () => {
    it("GET 200", () => {
      return request(app.getHttpServer())
        .get("/movies/1")
        .expect(200);
    });

    it("GET 404", () => {
      return request(app.getHttpServer())
        .get("/movies/9999")
        .expect(404);
    });
    // it("PATCH");
    // it("DELETE");
  });
  
  afterAll(async () => {
    await app.close();
  });
});