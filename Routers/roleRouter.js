import express from "express";
import { createRole, deleteRole, getRoleById, getRoles, updateRole } from "../Controllers/roleController.js";


const router = express.Router()

router.post('/create-role',createRole)
router.get('/get-roles',getRoles)
router.put('/edit-role/:id',updateRole)
router.get('/get-role-by-id/:id',getRoleById)
router.delete('/delete-role/:id',deleteRole)

export default router