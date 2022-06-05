import Link from "next/link"
import { create } from 'ipfs-http-client';
import { useState } from 'react'

const styles = {
    arrowButton: `bg-black mr-2 w-10 h-10 flex items-center justify-center rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-75`,
}

const client = create('https://ipfs.infura.io:5001/api/v0')


const cloudStorage = () => {
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
    <div className="App">
      <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={onChange}
      />
      {
        fileUrl && (
          <img src={fileUrl} width="600px" />
        )
      }
      <h1>IPFSLink: 
        <a href={fileUrl}>{fileUrl}</a>
      </h1>
    </div>
  )
}

export default cloudStorage