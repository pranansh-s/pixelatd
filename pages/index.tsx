import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import List from '../components/list'
import Hints from '../components/hints'
import { MovieContext } from '../utils/contexts'

import Popup from '../components/popup'


const Home: NextPage = () => {
  const [answer, setAnswer] = useState<string>()
  const [Mgenres, setGenres] = useState<string[]>()
  const [answerUrl, setAnswerUrl] = useState<string>()
  const [short, setShort] = useState<string>()
  const [guess, updateGuess] = useState<string[]>([])  
  
  const newList = (newGuess: string) => {
    updateGuess(guess => [...guess, newGuess])
  }

  const fetching = () => {
    fetch(`/api/imdb`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(res => res.json())
    .then(res => {
      setAnswer(res.name)
      setGenres(res.genre)
      setShort(res.short)
      fetch(`/api/answer/${encodeURIComponent(res.url)}`)
      .then(r => r.json())
      .then(r => setAnswerUrl(r.url)) })
      .catch(err => {
        console.log(err, "trying again")
        fetching()
      });
  }
  
  useEffect(() => {
    fetching()
    }, [])
    return (
      <div className="min-h-screen h-screen flex items-center justify-center min-w-fit p-8 select-none relative bg-cover bg-center bg-[url('../public/background.webp')]">
        <div className='flex flex-col h-[80%] text-center items-center justify-between'>
          <span className='tracking-wider font-Francois uppercase text-6xl text-white'>Pixelatd</span>
          <MovieContext.Provider value={{ movieName: answer || "", genres: Mgenres || [], url: answerUrl || "", guesses: guess, sum: short || "", setGuesses: newList }}>
            <div className='flex md:flex-row items-center justify-center flex-col-reverse'>
              <List/>
              <Hints/>
            </div>
          </MovieContext.Provider>
          <span className='md:text-sm text-xs font-Francois uppercase text-white opacity-20'>{(5 - guess.length)} guesses remaining</span>
        </div>
      </div>
  )
}

export default Home
