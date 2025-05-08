import Link from 'next/link'
 
export default function NotFound() {
  return (
   <div className='flex justify-center flex-col text-center mt-20'>
        <h2 className='pb-2'>Resource Not Found</h2>
        <Link href="/" className='text-cyan-700'>Return Home 🏠</Link>
  </div>
  )
}