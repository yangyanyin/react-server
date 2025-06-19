
// export default () => {
//   return (
//     <>
//       <h1>new Welcome to the About Page!</h1>
//     </>
//   )
// }

export default function ProductPage({ serverData }: { serverData?: any }) {
  return (
    <div>
      <h1>Product Detail</h1>
      <p>Name: {serverData ? serverData.product_name : ''}</p>
    </div>
  )
}