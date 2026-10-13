import jwt from 'jsonwebtoken'

// Reads the JWT from either the custom `token` header or `Authorization: Bearer <token>`
export const getTokenFromHeaders = (headers) =>
    headers.token || headers.authorization?.split(' ')[1]

const authUser = (req, res, next) => {
    const token = getTokenFromHeaders(req.headers)

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: 'Session expired. Login Again' })
    }
}

export default authUser
