async function addNumbers(a, b) {
  try {
    const response = await fetch("http://localhost:5000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a, b })
    });

    const data = await response.json();
    console.log(`The sum of ${a} and ${b} is:`, data.result);
  } catch (error) {
    console.error("Error communicating with Python server:", error);
  }
}

// Example usage
addNumbers(7, 5);