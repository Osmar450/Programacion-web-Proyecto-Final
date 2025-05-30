export const validateOrder = async (req, res, next) => {
  const order = req.body;

  if (!order.length > 0)
    return res.status(400).json({ message: 'No hay productos en el pedido' });

  const items = req.body;
  const ids = items.map((item) => item.id);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) {
    return res.status(400).json({
      message: 'No se permiten productos repetidos en el pedido',
    });
  }
  next();
};
