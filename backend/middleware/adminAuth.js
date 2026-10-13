import jwt from 'jsonwebtoken'
import { getTokenFromHeaders } from './auth.js'

const adminAuth = (req, res, next) => {
    const token = getTokenFromHeaders(req.headers)

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded.isAdmin) {
            return res.status(403).json({ success: false, message: 'Not an admin' })
        }

        req.auth = decoded
        next()
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token' })
    }
}

export default adminAuth
