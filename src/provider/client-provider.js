async function sendData(url, token, data){
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    return response.json().then((resp) => resp.data);
  } else {
    throw response.status;
  }
};

async function getData(url, token){
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  if (response.ok) {
    return response.json().then((resp) => resp.data);
  } else {
    throw response.status;
  }
};

async function patchData(url, token){
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    return response.json().then((resp) => resp.data);
  } else {
    throw response.status;
  }
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

export async function promoteUserAdminByID(token, id) {
  const query = process.env.REACT_APP_ADMIN_USERS_ID_URL + id
  return await patchData(query, token).catch((error) => {throw error});
}

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
  const query = process.env.REACT_APP_ADMIN_PROJECTS_ID_URL + id;
  return await getData(query, token).catch((error) => {throw error});
}

// Metrics

export async function getAllMetricsAdmin(token) {
  const query = process.env.REACT_APP_ADMIN_METRICS_URL
  return await getData(query, token).catch((error) => {throw error});
}

export async function getMetricsAdmin(token, timeinterval, fromdate, todate) {
  const data = `?timeinterval=${timeinterval}&fromdate=${fromdate}&todate=${todate}`
  const query = process.env.REACT_APP_ADMIN_METRICS_URL + data
  return await getData(query, token).catch((error) => {throw error});
}

function errorMessageTranslationAux(error){
  if (Math.floor(error.code / 500) == 5) return 'Error en el servidor. Intente más tarde';

  switch (error.message) {
    case 'id-in-use':
      return 'El id ya está en uso';

    case 'user-not-found':
      return 'Usuario no encontrado';

    case 'project-not-found':
      return 'Proyecto no encontrado';

    case 'project-is-favourite':
      return  'El proyecto ya es favorito';

    case 'user-is-viewer':
      return 'Ya eres veedor';

    case 'user-is-not-viewer':
      return 'No eres veedor';

    case 'user-is-viewing':
      return 'Ya te encuentras supervisando';

    case "edition-permissions":
      return 'No posees permisos de edición';

    case'owner-cant-sponsor':
      return 'No puedes patrocinar tu propio proyecto';

    case 'owner-cant-favourite':
      return 'No añadir a favoritos tu propio proyecto';

    case 'project-not-on-review':
      return 'El proyecto ya no se encuentra en búsqueda de Veedores';

    case 'owner-cant-review':
      return 'No puede supervisar su propio proyecto';

    case 'project-not-on-funding':
      return 'El proyecto ya no se encuentra en búsqueda de fondos';

    case 'missing-auth-header':
      return 'Falta el encabezado de Auth';

    case 'invalid-auth-header':
      return 'Encabezado de Auth inválido';

    case 'user-is-not-admin':
      return 'No eres administrador';

    case 'user-already-voted':
      return 'Ya has votado';

    case 'Project not in smart-contract':
      return 'El proyecto no forma parte del Smart Contract';

    case 'asked-resource-not-found':
    return 'No se encuentra el recurso solicitado';

    case 'database-connection-error':
    return 'Falla de conexión con la base de datos';

    case 'internal-service-req-error':
    return 'Falla de servicios internos';

    case 'unknown-error':
    return 'Error desconocido';

    case 'internal-server-error':
    return 'Falla interna del servidor';

  }

  return error.message; // 'Solicitud inválida, revise los campos indicados';
}

export function errorMessageTranslation(error){
   return {status: error.code, detail: errorMessageTranslationAux(error)};
};
