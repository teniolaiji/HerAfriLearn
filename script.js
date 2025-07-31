// Fetching the HTML elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const coursesContainer = document.getElementById("courses");

// Fetching data from API asynchronously with POST method
async function fetchCourses(query = "technology") {
  coursesContainer.innerHTML = '<div class="loading">Loading courses...</div>';

  try {
    // Properly formatted endpoint
    const url = `https://udemy-api2.p.rapidapi.com/v1/udemy/search?text=${encodeURIComponent(
      query
    )}`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "b4a601785dmshd84799f025ec1c1p1c6eb5jsnebedef5a0eb8",
        "X-RapidAPI-Host": "udemy-api2.p.rapidapi.com",
      },
      body: JSON.stringify({
        page: 1,
        page_size: 20,
        ratings: "",
        instructional_level: [],
        lang: [],
        price: [],
        duration: [],
        subtitles_lang: [],
        sort: "popularity",
        features: [],
        locale: "en_US",
        extract_pricing: true,
      }),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else if (response.status === 401) {
        throw new Error("Invalid API key. Please check your RapidAPI key.");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // According to docs, courses are inside data.data.courses
    displayCourses(data.data?.courses || []);
  } catch (error) {
    coursesContainer.innerHTML = `<p class="error">${error.message}</p>`;
    console.error("Error fetching courses:", error);
  }
}
