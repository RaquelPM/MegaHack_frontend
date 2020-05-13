export function login(username, password){
    return new Promise ((resolve, reject) => {
        fetch(`http://127.0.0.1:8000/users/token-login/`,{
            method: "POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({
              "username": username,
              "password": password 
            })
          })
  
          .then(resp=> resp.json())
          .then(resp=> {
              resolve(resp);
          })
          .catch(error => {
              reject(error);
          })
    })
}

export function post_data(url, body, json=false){
    return new Promise((resolve, reject) => {
        const user_token = localStorage.getItem('Token');
        const headers = {};
        let data = body;

        if (json){
            headers.ContentType = 'application/json'
            
            if(typeof(data) != 'string')
                data = JSON.stringify(data);
        }
        if (user_token){
            headers['Authorization'] = `Token ${user_token}`
        }

        
        fetch('http://127.0.0.1:8000/' + url, {
            method:"POST",
            headers: headers,
            body: data
        })
            .then(resp => resp.json())
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                reject(error);
            })
    })
}

export function get_data(url){
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8000/' + url, {
            headers: {
                "Content-type": `application/json`,
            }
        })
            .then(resp => resp.json())
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                reject(error);
            })
    })
}

export function get_data_with(url){
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8000/' + url, {
            headers: {
                "Content-type": `application/json`,
                "Authorization": `Token ${localStorage.getItem('Token')}`
            }
        })
            .then(resp => resp.json())
            .then(json => {
                resolve(json);
            })
            .catch(error => {
                reject(error);
            })
    })
}