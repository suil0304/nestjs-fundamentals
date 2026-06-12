import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/Movie';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService:MoviesService) {}

    @Get()
    getAll():Movie[] {
        return this.moviesService.getAll();
    }

    @Get("/:id")
    getOne(@Param("id") id:string):Movie {
        return this.moviesService.getOne(id);
    }

    @Post()
    createMovie(@Body() movieData:any):number {
        return this.moviesService.createMovie(movieData);
    }

    @Delete("/:id")
    deleteMovie(@Param("id") id:string):boolean {
        return this.moviesService.deleteMovie(id);
    }

    @Patch("/:id")
    patchMovie(@Param("id") id:string, @Body() movieData:object) {
        return {
            updatedMovieID: id,
            ...movieData
        };
    }
}