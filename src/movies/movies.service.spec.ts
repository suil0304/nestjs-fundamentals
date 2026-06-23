import { Test, TestingModule } from "@nestjs/testing";
import { MoviesService } from "./movies.service";
import { Movie } from "./entities/Movie";
import { NotFoundException } from "@nestjs/common";

describe("MoviesService", () => {
    let service:MoviesService;

    beforeEach(async () => {
        const module:TestingModule = await Test.createTestingModule({
            providers: [MoviesService]
        }).compile();

        service = module.get<MoviesService>(MoviesService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("getAll()", () => {
        it("should return an array", () => {
            const result = service.getAll();
            expect(result).toBeInstanceOf(Array);
        });
    });

    describe("getOne()", () => {
        it("should return an Movie", () => {
            service.createMovie({
                title: "Test",
                year: 0,
                genres: []
            });

            const movie = service.getOne(1);
            expect(movie).toBeDefined();
            expect(movie.id).toEqual(1);
        });

        it("should throw 404 error", () => {
            const id = 111111111111111111;
            try {
                service.getOne(id);
            }
            catch(error:any) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Movie with ID ${id}: not found`);
            }
        });
    });

    describe("deleteMovie()", () => {
        it("should delete an Movie", () => {
            service.createMovie({
                title: "Test",
                year: 2000,
                genres: []
            });

            const beforeDelete = service.getAll();
            service.deleteMovie(1);
            const afterDelete = service.getAll();

            expect(afterDelete.length).toBeLessThan(beforeDelete.length);
        });

        it("should throw 404 error", () => {
            const id = 111111111111111111;
            try {
                service.deleteMovie(id);
                fail("fail: not throw error");
            }
            catch(error:any) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toEqual(`Movie with ID ${id}: not found`);
            }
        });
    });

    describe("createMovie()", () => {
        it("should create a Movie", () => {
            const beforeCreate = service.getAll();
            service.createMovie({
                title: "Test",
                year: 2000,
                genres: []
            });
            const afterCreate = service.getAll();

            expect(afterCreate.length).toBeGreaterThan(beforeCreate.length - 1);
        });
    });

    describe("patchMovie()", () => {
        it("should update a Movie", () => {
            service.createMovie({
                title: "Test",
                year: 2000,
                genres: []
            });

            service.patchMovie(1, {
                title: "patch"
            });

            const result = service.getOne(1);

            expect(result.title).toBe("patch");
        });
    });
});