import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/Movie';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService:MoviesService) {}

    @Get()
    getAll():Movie[] {
        return this.moviesService.getAll();
    }

    @Get("/:id")
    getOne(@Param("id") id:number):Movie {
        return this.moviesService.getOne(id);
    }

    @Post()
    createMovie(@Body() movieData:CreateMovieDTO):number {
        return this.moviesService.createMovie(movieData);
    }

    @Delete("/:id")
    deleteMovie(@Param("id") id:number) {
        this.moviesService.deleteMovie(id);
    }

    @Patch("/:id")
    patchMovie(@Param("id") id:number, @Body() updateData:UpdateMovieDTO) {
        return this.moviesService.patchMovie(id, updateData);
    }
}