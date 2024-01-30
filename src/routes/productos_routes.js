import {Router} from 'express'
import { delete_products, register_product, show_for_id_products, show_products, update_products,} from '../controller/productos_controller.js'

 const router= Router()

router.get("/productos", show_products)
router.post("/productos", register_product)
router.delete("/productos/:id", delete_products)
router.put("/productos/:id", update_products)
router.get("/productos/:id", show_for_id_products)
export default router;