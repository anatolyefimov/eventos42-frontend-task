async function fetchFormData(token) {
    try {
        let res = await fetch(`https://form.eventos42.ru/api/form/${token}`)
        res = await res.json();

        return res;
    } catch (err) {
        console.error(err);
    }

}

export default fetchFormData;