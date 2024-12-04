import dotenv from 'dotenv'
import { housesCrawler } from '../src/services/houses/houses.service.ts'

dotenv.config()
housesCrawler()