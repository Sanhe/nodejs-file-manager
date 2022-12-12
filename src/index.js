import { getUserName } from './utils/username.js'

try {
  const userName = getUserName()
  console.log(userName)
} catch (error) {
  console.error(error.message)
  throw new Error("Operation failed");
}
