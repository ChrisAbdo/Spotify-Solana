import Link from 'next/link'
import { useContext } from 'react'

const styles = {
  uploadButton: `bg-green-500 mr-10 px-3 py-1.5 cursor-pointer hover:scale-95 transition rounded-full`,
}

const CloudButton = ({ setCloudStorage }) => {

  const uploadClicked = () => {
    console.log(setCloudStorage)
    setCloudStorage(true)
  }

  return (
    <div>
        <div onClick={uploadClicked} className={styles.uploadButton}>
            Cloud Storage
        </div>
    </div>
  )
}

export default CloudButton