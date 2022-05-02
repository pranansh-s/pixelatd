import React from 'react'
import Image from 'next/image'

import crossI from '../public/icon_cross-mark.svg'

interface item{ name: string | null }

const Guess: React.FC<item> = ({ name }) => {    
    return(
        <div className={`md:w-[30rem] w-[25rem] flex flex-row justify-left px-5 py-3 border-[3px] rounded-md m-[0.15rem] border-accent ${name ? 'backdrop-blur-xl' : '' } z-10`}>
            <Image 
                className={name ? 'visible' : 'invisible'}
                src={crossI}            
                width={17}
                height={17}
            />            
            <span className='md:text-md ml-5 font-Hind text-white text-ellipsis text-xs'>{name ? name : ""}</span>
        </div>
    )
}

Guess.defaultProps = { name: "" }
export default Guess