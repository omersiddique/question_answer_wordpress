export default async function getQuestions(title, content, categories, token, isNewQuestion){
    const login_url = `https://hikmahsessions.com/control-panelz/wp-json/wp/v2/question?per_page=30`;

    if (isNewQuestion){
        const login_data = {
          title,
          content,
          categories,
          "status" : "publish"
        }

        console.log('Login Data', login_data);
        
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