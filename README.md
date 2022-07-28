La aplicación fue creada utilizando Next.js + React , finalmente deployada en Vercel.
Se hizo uso de librerías como react-icons para importar los iconos SVG ,styled-components para tener una capa de UI solida y reutilizable y ahorrar la repetición de CSS, usando SWR para realizar la paginación de productos al ser solicitados , usando offset y limit. Haciendo uso también de getStaticProps + getStaticPaths para data fetching de Items page con la finalidad de obtener una experiencia de usuario mas fluida.Por ultimo haciendo un poco de uso de react context para compartir la dirección de envío del usuario , ya que usar una libreria como recoil era agregarle peso al proyecto sin sentido.

Se nutre de su backend creado en el modulo 9 de la carrera DWF de APX , también creado usando Next.js + TypeScript y siguiendo la arquitectura REST.

Url webapp : https://dwf-m10-challenge.vercel.app/
