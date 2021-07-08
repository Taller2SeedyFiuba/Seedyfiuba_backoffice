function sendData(url, token, data){
  return fetch(url, {
  	method: 'POST',
  	//mode : 'no-cors',
  	body: JSON.stringify(data),
  	headers: {
      'Authorization': 'Bearer ' + token,
  		'Content-Type': 'application/json'
  	}
  }).then((response) => {
    if(response.ok){
      return response.json().then((resp) => resp.data);
    }else{
      throw response.status;
    }
  });
};

function getData(url, token){
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
      }
  }).then((response) => {
    if(response.ok){
      return response.json().then((resp) => resp.data);
    }else{
      throw response.status;
    }
  });
};


// Users

export async function getUserData(token) {
  return await getData(process.env.REACT_APP_USERS_ME_URL, token).catch((error) => {throw error});
}

export async function sendUserData(token, data) {
  return await sendData(process.env.REACT_APP_USERS_URL, token, data).catch((error) => {throw error});
}

// Users admin

export async function getUsersAdmin(token, limit, page) {
  const query = process.env.REACT_APP_ADMIN_USERS_URL + `?limit=${limit}&page=${page}`
  return await getData(query, token).catch((error) => {throw error});
}

export async function getUserAdminByID(token, id) {
  const query = process.env.REACT_APP_ADMIN_USERS_ID_URL + id
  return await getData(query, token).catch((error) => {throw error});
}

// export async function promoteUserAdminByID(token, id) {
//   const query = process.env.REACT_APP_ADMIN_USERS_ID_URL + id
//   return await patchData(query, token).catch((error) => {throw error});
// }

// Projects admin

function querySearchString(data) {
  const dataArray = [];

  if (data.hasOwnProperty('limit')) {
    dataArray.push("limit=" + data.limit);
  } 

  if (data.hasOwnProperty('page')) {
    dataArray.push("page=" + data.page);
  } 

  if (data.hasOwnProperty('ownerid')) {
    dataArray.push("ownerid=" + data.ownerid);
  }

  if (data.hasOwnProperty('tags')) {
    dataArray.push(data.tags.map((element) =>{return 'tags=' + element}).join('&'));
  }

  if (data.hasOwnProperty('type')) {
    dataArray.push("type=" + data.type);
  } 

  if (data.hasOwnProperty('stage')) {
    dataArray.push("stage=" + data.stage);
  } 

  if (data.hasOwnProperty('dist') && data.hasOwnProperty('lat') && data.hasOwnProperty('lng')) {
    dataArray.push("lat=" + data.lat);
    dataArray.push("lng=" + data.lng);
    dataArray.push("dist=" + data.dist);
  }

  return '?' + dataArray.join('&');
}

export async function getProjectsAdmin(token, data) {
  const query = process.env.REACT_APP_ADMIN_PROJECTS_URL + querySearchString(data);
  return await getData(query, token).catch((error) => {throw error});
}

export async function getProjectAdminByID(token, id) {
  const query = process.env.REACT_APP_PROJECT_ID_URL + id;
  return await getData(query, token).catch((error) => {throw error});
}
