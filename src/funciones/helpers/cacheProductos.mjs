// src/funciones/helpers/cacheProductos.mjs
import { BOT } from '../../config/bot.mjs' // ← Añade esta línea arriba
import { obtenerTodosLosProductosAppSheet } from './leerProductosAppSheet.mjs'

export async function cargarProductosAlState(state) {
  // 🔒 Chequeo de flag PRODUCTOS: si está desactivado, no cargar productos
  if (!BOT.PRODUCTOS) {
    console.log('🛑 [cacheProductos] Flag PRODUCTOS está en FALSE, no se cargan productos.')
    await state.update({
      _productosFull: [],
      __productosCargados: true,
    })
    return []
  }

  const yaCargado = state.get('__productosCargados')
  let productos = state.get('_productosFull')

  if (yaCargado && Array.isArray(productos) && productos.length) {
    console.log('✅ Productos ya estaban en cache (state)')
    return productos
  }

  console.log('📦 Cargando productos por primera vez...')
  productos = await obtenerTodosLosProductosAppSheet()

  await state.update({
    _productosFull: productos,
    __productosCargados: true,
  })

  return productos
}

