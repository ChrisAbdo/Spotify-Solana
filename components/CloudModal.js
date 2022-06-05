import style from '../styles/UploadModal.module.css'
import { create } from 'ipfs-http-client';
import { useState } from 'react'


const client = create('https://ipfs.infura.io:5001/api/v0')


const CloudModal = ({setCloudStorage}) => {
    const [fileUrl, updateFileUrl] = useState(``)
    async function onChange(e) {
        const file = e.target.files[0]
        try {
          const added = await client.add(file)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          updateFileUrl(url)
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }
   
    
  return (
    <div className={style.wrapper}>
      <input
        type="file"
        onChange={onChange}
      />
      
      <h1>IPFSLink: 
        <h1  id="myInput">{fileUrl}</h1>
      </h1>
      <div className={style.modalButtons}>

     
        
        <button
          onClick={() => setCloudStorage(false)}
          className={`${style.button} ${style.cancelButton}`}
        >
          Cancel
        </button>
        
      </div>
    </div>
  )
}

export default CloudModal