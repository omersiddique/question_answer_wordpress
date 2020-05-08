export default async function getQuestions(title, content, token, isNewQuestion){
    const login_url = `https://hikmahsessions.com/control-panelz/wp-json/wp/v2/question?per_page=30`;

    if (isNewQuestion){
        const login_data = {
          title,
          content,
          "status" : "publish"
        }
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(login_data),
        }

        
        return await fetch(login_url, requestOptions);
    }
    else{
        return await fetch(login_url);
    }

}