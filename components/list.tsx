import React, { useContext } from 'react'
import Guess from './guess'
import Search from './search'

import { MovieContext } from '../utils/contexts'

const List: React.FC = () => {
    const context = useContext(MovieContext)

    return(
        <ul className='flex flex-col items-center justify-center text-left'>
            <Search />
            <Guess name={context?.guesses[context?.guesses.length - 1] || null} />
            <Guess name={context?.guesses[context?.guesses.length - 2] || null} />
            <Guess name={context?.guesses[context?.guesses.length - 3] || null} />
            <Guess name={context?.guesses[context?.guesses.length - 4] || null} />
            <Guess name={context?.guesses[context?.guesses.length - 5] || null} />
        </ul>
    )
}

export default List