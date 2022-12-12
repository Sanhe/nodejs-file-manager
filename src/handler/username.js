import { argv } from 'node:process'

const getUserName = () => {
  try {
    const userNameArg = argv.find(arg => arg.startsWith('--username'))
    const userName = userNameArg?.indexOf('=')
      ? userNameArg.split('=')[1]
      : undefined

    if (!userName) {
      throw new Error('Username is not provided')
    }

    return userName
  }
  catch (error) {
    console.log(error.message)
    throw new Error(error)
  }
}

export { getUserName }
