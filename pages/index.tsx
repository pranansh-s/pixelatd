import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import List from '../components/list'
import Hints from '../components/hints'
import { MovieContext } from '../utils/contexts'

import helpI from '../public/icon_help.svg'
import crossI from '../public/icon_cross-mark-white.svg'
import Popup from '../components/popup'


const Home: NextPage = () => {
  const [answer, setAnswer] = useState<string>()
  const [Mgenres, setGenres] = useState<string[]>()
  const [answerUrl, setAnswerUrl] = useState<string>()
  const [short, setShort] = useState<string>()
  const [guess, updateGuess] = useState<string[]>([])  
  
  const [help, setHelp] = useState<string>("")
  const newList = (newGuess: string) => {
    updateGuess(guess => [...guess, newGuess])
  }
  
  useEffect(() => {
    fetch(`/api/imdb`)
    .then(res => res.json())
    .then(res => {
      setAnswer(res.name)
      setGenres(res.genre)
      setShort(res.short)
      fetch(`/api/answer/${encodeURIComponent(res.url)}`)
      .then(r => r.json())
      .then(r => setAnswerUrl(r.url)) });
    }, [])
    
    useEffect(() => {
      if(answer){
        console.log(answer)
      }
    }, [answer])
    return (
      <div className="min-h-screen min-w-fit p-8 flex flex-col text-center items-center justify-center select-none relative bg-cover bg-center bg-[url('../public/background.png')] space-y-1">
      <Popup name={help || ""}/>
      {help ? <div className='md:relative fixed md:top-32 md:left-44 top-[5%] left-[90%] inline-block cursor-pointer active:animate-size z-50' onClick={() => setHelp("")}><Image src={crossI} width={20} height={20} alt="close"/></div> : ""}
      <div onClick={() => setHelp("help")} className='absolute active:animate-size right-0 top-5 md:m-10 m-5 cursor-pointer'>
        <Image 
            src={helpI}
            width={30}
            height={30}
            alt="i"
            />
      </div>
      <span className='tracking-wider font-Francois flex-1 p-6 uppercase text-6xl text-white'>Pixelatd</span>
      <MovieContext.Provider value={{ movieName: answer || "", genres: Mgenres || [], url: answerUrl || "", guesses: guess, sum: short || "", setGuesses: newList }}>
        <div className='flex md:flex-row items-center justify-center mt-10 flex-col-reverse'>
          <List/>
          <Hints/>
        </div>
      </MovieContext.Provider>
      <span className='md:text-xs text-[12px] font-Francois uppercase -mt-10 text-white opacity-20'>{(5 - guess.length)} guesses remaining</span>

    </div>

  )
}

export default Home
