async function logout() {
    try {
        let res = await fetch('/api/logout', {
            method:  'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('sessionId')
            }
        });
        localStorage.removeItem('sessionId');
        const statusCode = res.status;
        res = await res.json();
        res.statusCode = statusCode;

        return res;
    } catch (err) {
        console.error(err);
    }

}

export default logout;
