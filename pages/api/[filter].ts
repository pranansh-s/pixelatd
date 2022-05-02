// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as cheerio from 'cheerio'
import axios from 'axios'

type Data = {
  name: string[]
  time: string[]
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
  const { filter } = req.query
  const { data } = await axios.get(`https://www.moviemania.io/phone/search?q=${filter}`)
  const $ = cheerio.load(data)
  const title = $('.item .movie .title').toArray().map(el => $(el).text())
  const year = $('.item .movie .year').toArray().map(el => $(el).text())

  res.status(200).json({ name: title, time: year })
}
