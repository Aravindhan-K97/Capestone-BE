import express from 'express'
import { createDepartment, deleteDepartment, editDepartment, getDepartmentById, getDepartments } from '../Controllers/departmentController.js'

const router = express.Router()

router.post('/create-department',createDepartment)
router.get('/get-departments',getDepartments)
router.get('/get-department-by-id/:id',getDepartmentById)
router.put('/edit-department/:id',editDepartment)
router.delete('/delete-department/:id',deleteDepartment)

export default router;