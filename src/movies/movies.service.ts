import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/Movie';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies:Movie[] = [];

    getAll():Movie[] {
        return this.movies;
    }

    getOne(id:number):Movie {
        const movie:Movie | undefined = this.movies.find((movie) => {
            return movie.id === id;
        });

        if(!movie) {
            throw new NotFoundException(`Movie with ID ${id}: not found`);
        }

        return movie;
    }

    createMovie(movieData:CreateMovieDTO):number {
        return this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
    }

    deleteMovie(id:number) {
        this.getOne(id);
        this.movies = this.movies.filter((movie) => {
            return movie.id !== id;
        });
    }

    patchMovie(id:number, updateData:UpdateMovieDTO) {
        const movie = this.getOne(id);
        this.deleteMovie(id);
        this.movies.push({ ...movie, ...updateData });
    }
}
