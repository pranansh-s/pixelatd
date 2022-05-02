import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import { MovieContext } from '../utils/contexts'

const Hints: React.FC = () => {
    const [displayGuesses, setDisplayGuesses] = useState<string>()
    const context = useContext(MovieContext)
    const link = context?.url
    
    useEffect(() => {
        if(context?.guesses.length == 1) setDisplayGuesses(context.genres[0].trim())
        else if(context?.guesses.length == 3 && context.genres.length > 1) setDisplayGuesses(displayGuesses + ' • ' + context.genres[1].trim())
        else if(context?.guesses.length == 4 && context.genres.length > 2) setDisplayGuesses(displayGuesses + ' • ' + context.genres[2].trim())        
    }, [context?.guesses])
    return(
        <div className='md:-ml-10 w-80 h-[27rem] bg-primary rounded-xl overflow-hidden md:shadow-[-10px_0px_20px_-15px_rgba(0,0,0,1)] z-20'>
            <div className={`h-[27rem] w-[20rem] ${link ? '' : 'p-32'} ${link ? context?.guesses.length == 1 ? 'blur-lg' : context?.guesses.length == 2 ? 'blur-md' : context?.guesses.length == 3 ? 'blur' : context?.guesses.length == 4 ? 'blur-sm' : context?.guesses.length == 5 ? 'blur-0' : 'blur-xl' : 'blur-0'}`}>
                {link ? <Image src={`https:${link}`} height={1500} width={1000}/> :
                <div className='flex flex-col justify-center items-center'><Image src="https://i.gifer.com/XOsX.gif" width={100} height={150}/> <span className='font-Hind whitespace-nowrap text-gray-400'>Finding a Poster...</span></div>}
            </div>
            <div className='relative -top-16 z-30 bg-black/70 h-full'>
                <span className='md:text-sm text-xs font-Hind text-white m-auto p-5 top-4 relative z-30'>{displayGuesses}</span>
            </div>
        </div>
    )
}

export default Hints;