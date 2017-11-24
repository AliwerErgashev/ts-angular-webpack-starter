import { AccessTokenDao, accessTokenDao } from './access-token-dao'

export const accessTokenApiFactory = (accessTokenDao: AccessTokenDao) => ({
  'create': ({ params }) => {
    const { username, password } = params
    return accessTokenDao.create(username, password)
  },
})

export const accessTokenApi = accessTokenApiFactory(accessTokenDao)
