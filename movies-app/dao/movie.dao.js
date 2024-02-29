const client = require('../db-connect');


    async function selectAllMovies(){
        const sql = "SELECT * FROM movies";
        const result = await client.query(sql);
        console.log(result.rows);
          
        return result.rows.map(row=> convertMovieData(row));
    }


    function convertMovieData(data) {
        if (!data || data == Object.keys(data).length === 0) {
            return {};
        }
    
        return {
            movie_id: data.movie_id,
            title: data.title,
            price: Number(data.price),
            available: data.available,
            return_date:Number(data.return_date),
            genre : data.genre
        }
    }

    async function selectMovie(movie_id) {
        const sql = "SELECT * FROM movies WHERE movie_id=$1"
        const values = [movie_id]; 
    
    
        const result = await client.query(sql, values);
    
        return convertMovieData(result.rows[0]);
    }


    async function insertMovie(movie) {
        const sql = "INSERT INTO movies VALUES (default,$1,$2,$3,$4) RETURNING *"
        const values = [movie.title, movie.genre, movie.available, movie.price];
    
        const result = await client.query(sql, values);
    
        return convertMovieData(result.rows[0]);
    }

    async function updateMovie(movie) {
        const sql = "UPDATE movies SET title=$1, genre= $2, available=$3, price=$4 WHERE movie_id = $6 RETURNING *";
        const values = [movie.title, movie.genre, movie.available, movie.price, movie.movie_id];
    
        const result = await client.query(sql, values);
    
        return convertMovieData(result.rows[0]);
    }
    
    async function deleteMovie(movie_id) {
        const sql = "DELETE FROM movies WHERE movie_id=$1 RETURNING *";
        const values = [movie_id];
    
        const result = await client.query(sql, values);
    
        return convertMovieData(result.rows[0]);
    }
    
   

module.exports={

    getAllMovies:selectAllMovies,
    getMovieById : selectMovie,
    createMovie : insertMovie,
    updateMovieById :updateMovie,
    deleteMovieById :deleteMovie

}