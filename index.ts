import express from 'express';
import axios from 'axios';
import cors from 'cors';
import Redis from 'redis'
import { Photo } from './models';
// rest of the code remains same
const app = express();
const redisClient = Redis.createClient( )
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const PORT = 8000;
const DEFAULT_EXPIRATION = 3600
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.get('/photos', async (req, res) => {
  const albumId = req.query.albumId
  const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
    const { data } = await axios.get<Photo[]>('https://jsonplaceholder.typicode.com/photos', {
      params: { albumId }
    })
    return data
  })
  res.json(photos)
})

app.get('/photos/:id', async (req, res) => {
  const photo = await getOrSetCache<Photo>(`photos:${req.params.id}`, async () => {
    const { data } = await axios.get<Photo>(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`)
    return data
  })
  res.json(photo)
})

async function getOrSetCache<T>(key: string, cb: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, reply) => {
      if (error) return reject(error)
      if (reply != null) return resolve(JSON.parse(reply))
      const freshData = await cb()
      redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
      resolve(freshData)
    })
  })
}

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});