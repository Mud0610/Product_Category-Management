import { Router } from "express";
import productController from "../controller/productMasterController.js";
const router = Router();

router.get("/", productController.displayProducts);

router.get("/new", productController.addProductFrom);

router.post("/", productController.addNewProduct);

router.get("/:id/edit", productController.editProductFrom);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

export default router;
