export default async function login_url(username, password){

   const login_url = `https://hikmahsessions.com/control-panelz/wp-json/jwt-auth/v1/token`;
    const login_data = {
      username,
      password
    }
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(login_data),
    }
    return await fetch(login_url, requestOptions);
}