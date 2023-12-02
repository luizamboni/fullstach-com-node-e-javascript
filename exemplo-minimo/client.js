document.getElementById('sendButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;

    fetch('http://localhost:3000/echo', {
        method: 'POST',
        body: inputText
    })
    .then(response => {
        if (response?.ok) {
           return response.text()
        }
        throw new Error("ops...houve um problema")
    })
    .then(data => {
        document.getElementById('responseText').innerText = data;
    })
    .catch(err => {
        document.getElementById('responseText').innerText = err.message ;
    })
});
