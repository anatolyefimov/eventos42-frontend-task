async function fetchFormData(token) {
    try {
        let res = await fetch(`https://form.eventos42.ru/api/form/${token}`);
        res = await res.json();
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
    }

}

export default fetchFormData;
