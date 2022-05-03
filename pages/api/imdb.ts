import type { NextApiRequest, NextApiResponse } from 'next'
import * as cheerio from 'cheerio'
import axios from 'axios'
import { randomInt } from 'crypto'

type Movie = {
  name: string
  url: string
  genre: string[]
  short: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Movie> ) {
  var re: Movie = { name: "", url: "", genre: [], short: ""};
  const page = randomInt(100);
  const { data } = await axios.get(`https://www.imdb.com/search/title/?title_type=feature&count=100&start=${page}01`)
  const $ = cheerio.load(data)
  var rand = randomInt(100)
  re.name = $('.lister-item h3 a').eq(rand).text()
  re.genre = $('.lister-item-content .genre').eq(rand).text().split(',')
  re.short = $('.lister-item-content p.text-muted').eq(2 * rand + 1).text().trim().replace("See full summary", '')  
    
  if(re.name){
      const q = re.name.trim().replace(/\s/g, '+')
      const { data } = await axios.get(`https://www.moviemania.io/phone/search?q=${q}`)
      const $ = cheerio.load(data)

      re.url = $('.item a').attr('href') || ""
			const check = $('.item .movie .title').map((i, e) => $(e).text().trim().replace(/\s/g, '+')).get()
      if(!check.includes(q)){
        re = await fetch('http://localhost:3000/api/imdb')
                        .then((res) => res.json())
                        .then((res) => { return res })
        
      }
  }

  res.status(200).json({ name: re.name, url: re.url, genre: re.genre, short: re.short })
}
