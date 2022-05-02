import type { NextApiRequest, NextApiResponse } from 'next'
import * as cheerio from 'cheerio'
import axios from 'axios'

type Poster = {  
  url: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Poster> ) {
  const { poster } = req.query  
  const { data } = await axios.get(`https://www.moviemania.io${poster}`)
  const $ = cheerio.load(data)

  const result = JSON.parse($('.wallpaper').eq(0).attr('data-images-urls') || "")[0].url  
  res.status(200).json({ url: result })
}
