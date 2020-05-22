export default async function getQuestions({title, content, categories, token, isNewQuestion = false, page = `1`}){
    //console.log('GETQUESTIONS', page);
    const login_url = `https://hikmahsessions.com/control-panelz/wp-json/iman-shield/v1/questions?page=${page}`;

    if (isNewQuestion){
        const login_data = {
          title,
          content,
          categories,
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
        let result = await fetch(login_url);
        //console.log('GET Qustions', result);
        return result;
    }

}