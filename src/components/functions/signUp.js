export default async function signUp(username, email, password){
    const login_url = `https://hikmahsessions.com/control-panelz/wp-json/wp/v2/authors/register`;
    const login_data = {
        username,
        email,
        password
    }
    const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(login_data),
    }
    return await fetch(login_url, requestOptions);
}
    