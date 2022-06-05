import Link from 'next/link'
import { useContext } from 'react'

const styles = {
  uploadButton: `bg-green-500 mr-10 px-3 py-1.5 cursor-pointer hover:scale-95 transition rounded-full`,
}

const CloudButton = ({ setShowUploadMusic }) => {

  const uploadClicked = () => {
    console.log(setShowUploadMusic)
    setShowUploadMusic(true)
  }

  return (
    <div>
        <Link href='/cloud-storage'>
            <div className={styles.uploadButton}>
                Cloud Storage
            </div>
        </Link>
    </div>
  )
}

export default CloudButton