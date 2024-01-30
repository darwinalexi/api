import { pool } from "../database/conexion.js";


export const show_products = async(req,res)=>{
    try {

        const [consulta]= await pool.query("select*from productos;")

        if (consulta.length >0) {
            res.status(200).json(consulta)
        }else{
            res.status(404).json({
                "mensaje":"no hay usuarios registrados"
            })

        }
        
    } catch (error) {   
        res.status(500).json({
            "mensaje" : error
            })
    }
}

export const register_product =  async(req, res)=>{
    try {
        const {nombre, referencia,cantidad, precio, observaciones }= req.body
        const [consulta] = await pool.query(
            "INSERT INTO productos(nombre, referencia, cantidad, precio, observaciones) VALUES (?, ?, ?, ?, ?)",
            [nombre, referencia, cantidad, precio, observaciones]
        );

        if (consulta.affectedRows >0) {
            res.status(200).json({
                "mensaje":"se registro extosamente"
            })
        }else{
            res.status(404)({
                "mensaje":"no se pudo refgistrar"
            })
        }
    } catch (error) {
        res.status(500).json({
            "menaje":"algo salio mal"
        })
    }
}

export const delete_products = async(req,res)=>{

    try {
        const { id } = req.params;
        const [ borrar ]= await pool.query("delete from productos where id= ?", [id]);


        if (borrar.affectedRows >0 ) {
            
            res.status(200).json({
                "mensaje":"se elimino con exito"
            })
        } else {
            res.status(404).json({
                "mensaje":"fue imposible eliminar este producto"
            })
        }
    } catch (error) {
        res.status(500).json({
            "menaje":"algo salio mal"
        })
    }
}

export const update_products = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, referencia, cantidad, precio, observaciones } = req.body;

        const updateQuery = `
            UPDATE productos
            SET nombre = ?,
                referencia = ?,
                cantidad = ?,
                precio = ?,
                observaciones = ?
            WHERE id = ?
        `;

        const params = [
            nombre ? nombre : null,
            referencia ? referencia : null,
            cantidad ? cantidad : null,
            precio ? precio : null,
            observaciones ? observaciones : null,
            parseInt(id)
        ];

        const [resultado] = await pool.query(updateQuery, params);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                mensaje: "El producto ha sido actualizado"
            });
        } else {
            res.status(404).json({
                mensaje: "No se pudo actualizar el producto, es posible que el ID no exista"
            });
        }

    } catch (error) {
        res.status(500).json({
            mensaje: "Algo salió mal",
            error: error.message
        });
    }
};

export  const show_for_id_products = async(req, res)=>{

   try {
    const {id}=req.params;
    const [consulta] = await pool.query("select*from productos where id=?", [id])

    if (consulta.length>0) {
        res.status(200).json(consulta)
    } else {
      res.status(404).json({
        "mensaje":"no se encontro un producto con este id"
      })  
    }
   } catch (error) {
    res.status(500).json({
        "mensaje":"algo corrio delideradamente"
    })
   }
}


