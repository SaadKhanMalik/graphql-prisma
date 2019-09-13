import jwt from "jsonwebtoken"

const getUserID = (request) => {
  const header = request.headers.authorization

  if (!header) {
    throw new Error("Authentication required")
  }

  const token = header.replace("Bearer ", "")
  const decoded = jwt.verify(token, 'popsicle')

  return decoded.userId

}

export { getUserID as default }