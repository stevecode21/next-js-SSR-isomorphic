// Importamos la librería
import slugify from 'slugify'

// función para crear un slug, por parametró recibirá el nombre del slug
export default function slug (name) {
  // Retornará este nombre y con lower en true lo convertirá siempre a minúsculas y la regExp lo que hará es convertir todo lo que sea diferente a una palabra o un guión a nada ('')
  return slugify(name, { lower: true }).replace(/[^\w\-]+/g, '')
}
