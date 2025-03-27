import express from "express"
import { login, register } from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/login-check",login) 
router.post("/register",register)
router.get("/profile",authMiddleware, (req, res)=>{
    return res.json(req.user) // req.user  set by  middleware
})
export default router;