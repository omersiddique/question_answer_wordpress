export default async function saveHeart(title,type,id,token){
    const login_url = `https://hikmahsessions.com/control-panelz/wp-json/iman-shield/v1/hearts`;

    
        const login_data = {
            "post_title": title,
            "heart_type": type,
            "post_ID" : id
        }

        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(login_data),
        }
        
        let response = await fetch(login_url, requestOptions);
        return await response.json();
}