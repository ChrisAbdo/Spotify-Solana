import style from '../styles/UploadModal.module.css'
import axios from 'axios'
import { create } from 'ipfs-http-client';
import { useState } from 'react'
const client = create('https://ipfs.infura.io:5001/api/v0')


const UploadModal = ({
  description: title,
  musicUrl,
  newMusic,
  setTitle,
  setMusicUrl,
  setShowUploadMusic,
}) => {
  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })

  const uploadClicked = async () => {
    var files = document.querySelector('#music-file')

    if (files.files.length == 0) return

    const base64_file = await toBase64(files.files[0])

    axios
      .post(
        '/api/upload_music',
        { file: base64_file, filename: files.files[0].name },
        {},
      )
      .then(res => {
        console.log(res.data)
        if (
          res.data.result &&
          res.data.result.created &&
          res.data.result.created[0].dataTxId
        )
          setMusicUrl(
            'https://arweave.net/' + res.data.result.created[0].dataTxId,
          )
      })
      .catch(err => {
        console.log(err)
      })
  }

  const createNewClicked = () => {
    newMusic()
  }

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

      <div className={style.title}>Upload New Music</div>
      
      <h1>Don't have a URL? Create one here!</h1>
      <input
        type="file"
        onChange={onChange}
      />
      <div className={style.fileUrl}>{fileUrl}</div>


      <h1>Paste this link into Music Url</h1>
      <h1>~~~~~~~~~~~~~~~~~~~~~~~~~~~~</h1>
      <div className={style.inputField}>
        <div className={style.inputTitle}>Title</div>
        <div className={style.inputContainer}>
          <input
            className={style.input}
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className={style.inputField}>
        <div className={style.inputTitle}>Music Url</div>
        <div className={style.inputContainer}>
          <input
            className={style.input}
            type='text'
            value={musicUrl}
            onChange={e => setMusicUrl(e.target.value)}
          >
          </input>
          
          
          
        </div>
      </div>
      <div className={style.modalButtons}>
        <button
          onClick={() => setShowUploadMusic(false)}
          className={`${style.button} ${style.cancelButton}`}
        >
          Cancel
        </button>
        <button
          onClick={createNewClicked}
          className={`${style.button} ${style.createButton}`}
        >
          Create New
        </button>
      </div>
    </div>
  )
}

export default UploadModal