import { Injectable } from '@nestjs/common';
import { Movie } from './entities/Movie';

@Injectable()
export class MoviesService {
    private movies:Movie[] = [];

    getAll():Movie[] {
        return this.movies;
    }

    getOne(id:string):Movie {
        return this.movies.find((movie) => {
            return movie.id === Number.parseInt(id);
        })!;
    }

    createMovie(movieData:any):number {
        return this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
    }

    deleteMovie(id:string):boolean {
        this.movies.filter((movie) => {
            return movie.id !== Number.parseInt(id);
        });
        return true;
    }
}
