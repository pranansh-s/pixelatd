import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { MovieContext } from '../utils/contexts'
import searchI from '../public/icon_search.svg'
import Popup from './popup'

const Search: React.FC = () => {
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [searchYear, setYearResults] = useState<string[]>([]);
    const [popup, setPopup] = useState<string>("")
    const [inputText, setInputText] = useState<string>("")
    const input = useRef<HTMLInputElement>(null)
    const list = useRef<HTMLInputElement>(null)
    const context = useContext(MovieContext)

    const updateList = (e: any) => {
        e.preventDefault()
        if(input.current?.value && context?.guesses && context?.guesses.length <= 4 && !context.guesses.includes(input.current.value)){
            context?.setGuesses(input.current?.value)
            setSearchResults([])
            setYearResults([])    
            if(context?.movieName.toLowerCase().trim().replace(/[^a-zA-Z0-9]/g,'') == input.current?.value.toLowerCase().trim().replace(/[^a-zA-Z0-9]/g,'')) {
                setPopup('won')
                return
            }
            input.current.value = ""
        }
        
        if(context?.guesses.length == 4) setPopup("lost")
    }

    useEffect(() => {
        const abortController = new AbortController()
        const { signal } = abortController
        if(input.current?.value){
            setInputText(input.current.value)
            const query = input.current.value.trim().replace(/\s/g, '+')

            fetch(`/api/${query}`, { signal })
                .then(res => res.json())
                .then(res => {
                    setSearchResults(res.name)
                    setYearResults(res.time)
                })
                .catch(err => {return true});
        }
        setSearchResults([])
        setYearResults([])

        return () => abortController.abort()
    }, [inputText])

    const erase = (result: string) => {
        input.current?.value ? input.current.value = result : null
        if(input.current?.value){
            input.current.value = result
        }
        setSearchResults([])
        setYearResults([])
    }

    return(
        <>  
            <form onSubmit={updateList} className='md:w-[26rem] md:-ml-16 bg-primary w-[25rem] h-16 m-2 rounded-md overflow-hidden flex flex-row items-center justify-center'>
                <div className='md:w-7 w-5 md:h-7 h-5 md:ml-0 -ml-1'>
                    <Image src={searchI} alt="Search"/> 
                </div>
                {context?.movieName ? <input ref={input} onChange={(e) => setInputText(e.currentTarget.value)} className='md:w-64 w-64 md:ml-3 ml-3 font-Hind focus:outline-none h-12 bg-transparent text-ellipsis text-white'/> : <div className='md:w-64 w-64 md:ml-3 ml-3'></div>}
                <button className='bg-secondary hover:bg-orange-800 active:animate-size relative md:w-20 w-[5rem] md:text-xl text-xl font-Gidugu -right-[1rem] md:py-[0.9rem] py-4 rounded-md uppercase text-white'>Submit</button>
            </form>
            <div>
                <div ref={list} className={`md:w-[26rem] overflow-x-hidden overflow-y-auto absolute w-[25rem] bg-primary z-30 md:-ml-[15.2rem] -ml-[12.5rem] -mt-2 flex flex-col justify-center align-top`}>
                    {(searchResults.length == 0) ? "" : searchResults.map((result, i) => 
                        <a key={result} className='p-3 text-sm hover:bg-gray-900 hover:text-base hover:cursor-pointer' onClick={() => erase(result)}>
                            <p className='text-white mx-5'>{result} ({searchYear[i]})</p>
                        </a>)}
                </div>
            </div>

            <Popup name={popup}/>
        </>
    )
}

export default Search