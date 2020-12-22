import Axios from "axios";

export function fetch(options) {
  return new Promise((resolve, reject) => {
    const instance = Axios.create({
      headers: {
        // "Content-Type": "application/json"
      },
      timeout: 10000
    });
    instance(options)
      .then(response => {
        if (response.status == "200") {
          if (response.data.code == "200") {
            resolve(response.data);
          } else {
            reject(response.data.msg);
          }
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
