

function convertZipToBlob(zip) {
    return new Promise((resolve, reject) => {
      zip.generateAsync({ type: 'blob' })
        .then(blob => {
          resolve(blob);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

export default convertZipToBlob;