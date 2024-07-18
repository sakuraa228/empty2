document.getElementById('secretForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const secret = document.getElementById('secretInput').value.trim();

    if (secret === '') {
        alert('Пожалуйста, введите свой секрет.');
        return;
    }

    try {
        const response = await fetch('/submit-secret', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ secret })
        });

        if (!response.ok) {
            throw new Error('Ошибка отправки сообщения.');
        }

        const responseData = await response.json();
        document.getElementById('responseMessage').innerText = `Ваш секрет успешно отправлен с ID: ${responseData.secretId}`;
        document.getElementById('secretInput').value = '';
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке секрета.');
    }
});
