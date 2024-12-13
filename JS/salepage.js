document.getElementById('createItemForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Grab the form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Get the input values for validation
    const { title, description, category_id, item_condition, starting_price, end_time, image, email } = data;
    const responseMessage = document.getElementById('responseMessage');

    // Clear previous response message
    responseMessage.textContent = '';

    // Validation Checks
    if (!title) {
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Title (ชื่อเกมส์) is required.';
        return;
    }

    if (!description) {
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Description (รายละเอียด) is required.';
        return;
    }

    if (!category_id) {
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Category (หมวดหมู่) is required.';
        return;
    }

    const validConditions = ['New', 'Very new', 'Good', 'Bad'];
    if (!validConditions.includes(item_condition)) {
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Item condition (สภาพ) must be one of: New, Very new, Good, Bad.';
        return;
    }

    if (starting_price <= 0) {
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Starting price (ราคาเริ่มต้น) must be greater than 0.';
        return;
    }

    const currentTime = new Date();
    const endTime = new Date(end_time);
    currentTime.setMinutes(currentTime.getMinutes() + 60); // Add 60 minutes to current time

    if (endTime < currentTime) {
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'End time (วันที่-เวลาสิ้นสุด) must be at least 60 minutes from the current time.';
        return;
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Email (email ของผู้ขาย) is not valid.';
        return;
    }

    // If validation passes, send data to the server
    try {
        const response = await fetch('/api/createGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            responseMessage.style.color = 'green';
            responseMessage.textContent = result.message;
        } else {
            responseMessage.style.color = 'red';
            responseMessage.textContent = result.message;
        }
    } catch (error) {
        console.error('Error:', error);
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Failed to create item. Please try again.';
    }
});
