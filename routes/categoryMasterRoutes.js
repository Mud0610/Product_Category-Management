import { Router } from "express";
import categoryController from "../controller/categoryMasterController.js";

const router = Router();

router.get("/", categoryController.getAllCategory);

router.post("/", categoryController.addNewCategory);

router.get("/new", categoryController.getFormToAdd);

router.get("/:id/edit", categoryController.editCategoryWithId);

router.put("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

export default router;
