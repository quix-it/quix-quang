export async function blobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result)
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsDataURL(blob)
  })
}

export async function base64ToDataUri(base64: string, type = 'application/octet-stream') {
  return `data:${type};base64,${base64}`
}

export async function dataUriToBlob(dataUri: string): Promise<Blob> {
  return (await fetch(dataUri)).blob()
}
