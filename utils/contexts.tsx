import React from 'react'

interface Props{ name: string | boolean }

interface Movie {
    movieName: string
    url: string
    genres: string[]
    guesses: string[]
    sum: string
    setGuesses: (nextGuess: string) => void
}
  
export const MovieContext = React.createContext<Movie | null>(null)
export default Props;