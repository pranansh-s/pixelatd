import React, { useContext } from 'react'
import Image from 'next/image'

import insta from '../public/instagram.png'
import github from '../public/github.png'
import Props, { MovieContext } from '../utils/contexts'

const Popup: React.FC<Props> = ({ name }) => {
    const context = useContext(MovieContext)
    const link = context?.url
    return(
        <div className={`md:absolute md:w-full md:h-full bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-50 top-0 left-0 flex justify-center  ${name ? 'visible' : 'invisible'}`}>
            <div className={`${name == 'help' ? 'md:w-[28rem]' : 'md:w-[38rem]'} md:h-fit md:relative h-full m-auto w-full fixed py-20 rounded-md bg-primary top-0 left-0 flex flex-col justify-center items-center border-4 ${name == 'won' ? 'border-green-500' :  name == 'lost' ? 'border-red-500' : "border-[#5a95c9]"}`}>
                <Image className='opacity-5' src="https://media.istockphoto.com/photos/background-of-fresh-made-popcorn-picture-id149066514?k=20&m=149066514&s=612x612&w=0&h=xJWeVgSCXaqj4A-CPVZeJrFoH98StvyEAs9SJQMZKVo=" layout='fill'/>
                {name != "help" ? 
                <>
                    <span className='md:text-xl text-2xl text-white/40 font-Francois'>{name == "won" ? `Congratulations! You Got It in ${context?.guesses.length} Guess${context?.guesses.length > 1 ? 'es' : '' }` : name == "lost" ? `Better Luck Next Time, It was...` : ""}</span>
                    <hr className='w-96 opacity-40'/>
                    <span className='md:text-2xl text-3xl text-white font-Francois p-5'>{context?.movieName}</span>
                    <div className='bg-black/95 rounded-md w-full flex justify-center py-3 p-5'>
                        {link ? <div className='md:w-[20rem] w-[30rem]'><Image src={`https:${link}`} height={300} width={200} layout='fixed'/></div> : "Loading..."}
                        <span className='text-white/40 font-Hind md:text-sm md:w-[37rem] w-[55rem] -mt-3 p-5 text-base overflow-ellipsis'>{context?.sum}</span>
                        <button onClick={() => window.location.reload()} className='bg-secondary hover:bg-orange-800 active:animate-size px-5 py-3 text-white font-Gidugu text-xl absolute rounded-md right-5 mt-60'>Play Again</button>
                    </div>
                </> :
                <>
                    <span className='md:ml-6 ml-16 self-start md:text-2xl text-4xl text-white font-Francois'>About</span>
                    <p className='text-left md:ml-6 mx-16 m-1 self-start text-white/40 font-Hind md:text-sm text-base'>Game to judge and expand your cinephilia knowledge, by guessing movie posters.</p>
                    <p className='text-left md:ml-6 mx-16 m-1 self-start text-white/40 font-Hind md:text-sm text-base'>Your goal is to correctly identify the movie poster in the limited 5 guesses, after each guess you'll get more and more hints in the form of less blurred poster and genres of the afore mentioned movie</p>
                    <p className='text-left md:ml-6 mx-16 m-1 self-start text-white/40 font-Hind md:text-sm text-base'>All information used was taken from <em>moviemania.io</em> and <em>imdb.com</em> and is only intended for entertainment purposes - no copyright infringement intended</p>
                    <div className='flex flex-row relative md:space-x-2 space-x-6 md:ml-6 ml-16 -bottom-10 self-start'>
                        <a className='hover:animate-size' target="_blank" href="https://www.instagram.com/prononshu/"><Image width={35} height={35} src={insta} /></a>
                        <a className='hover:animate-size' target="_blank" href="https://github.com/pranansh-s"><Image width={35} height={35} src={github} /></a>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default Popup