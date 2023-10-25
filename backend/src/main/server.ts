import { expressApp } from './app'
import { PORT, prisma } from './config'

const startServer = async () => {
  await prisma.$connect()

  expressApp.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
}

startServer()
  .catch(console.error)
