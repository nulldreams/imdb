# Public IMDB (In progress)

A simple scraping api for IMDB

## How to use?
Simple! Send a `GET` request to `https://public-imdb.herokuapp.com/api/v1/movie/:title` the return will be like this

URL: `https://public-imdb.herokuapp.com/api/v1/movie/2001: A Space Odyssey`
```
{
    "name": "2001: A Space Odyssey (1968)",
    "title": "",
    "release_date": "1968",
    "content_rating": "G",
    "duration": "2h 29min",
    "director": "Stanley Kubrick",
    "plot": "Humanity finds a mysterious, obviously artificial object buried beneath the Lunar surface and, with the intelligent computer H.A.L. 9000, sets off on a quest.",
    "rating": "8.3",
    "actors": [
        "Keir Dullea",
        "Gary Lockwood",
        "William Sylvester"
    ],
    "genre": [
        "Adventure",
        "Sci-Fi"
    ]
}
```

If you have any suggestion about this `API`, please create a issue.
