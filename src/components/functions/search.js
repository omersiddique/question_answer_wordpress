export default async function Search(term){
    const login_url = `https://hikmahsessions.com/control-panelz/wp-json/iman-shield/v1/search?term=${term}`;
      
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'
            },
     }

        
        return await fetch(login_url, requestOptions);
}