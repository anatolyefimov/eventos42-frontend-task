async function login(data) {
    try {
        console.log(data)
        let res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const statusCode = res.status
        res = await res.json()
        res.statusCode = statusCode

        if (statusCode === 200) {
            localStorage.setItem('sessionId', res.sessionId)
        }
        
        return res;
    } catch(err) {
        console.error(err)
    }

}

export default login;