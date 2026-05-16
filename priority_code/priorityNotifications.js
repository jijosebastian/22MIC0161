const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqaWpvc2ViYXN0aWFuNzEwQGdtYWlsLmNvbSIsImV4cCI6MTc3ODkzMzA1OSwiaWF0IjoxNzc4OTMyMTU5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYTQzMjA4ZjctOWQwMi00NDdiLWE3ZjAtYWM5MDVjMTI1M2NmIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiamlqbyBzZWJhc3RpYW4iLCJzdWIiOiI0YjkwMmJkNC1mNzY0LTRiOTYtYTA4Ni0zYmI3NDIyZTRjNWYifSwiZW1haWwiOiJqaWpvc2ViYXN0aWFuNzEwQGdtYWlsLmNvbSIsIm5hbWUiOiJqaWpvIHNlYmFzdGlhbiIsInJvbGxObyI6IjIybWljMDE2MSIsImFjY2Vzc0NvZGUiOiJTZkZ1V2ciLCJjbGllbnRJRCI6IjRiOTAyYmQ0LWY3NjQtNGI5Ni1hMDg2LTNiYjc0MjJlNGM1ZiIsImNsaWVudFNlY3JldCI6IlVSdFl1eVJEUFFacERUYWIifQ.6GzR8U3cxkqexbQUpdRi56-pQ2I5mFiu7gecF1wryQA";

const weight = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function getTop10Notifications() {
  try {
    const res = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    const top10 = res.data.notifications
      .sort((a, b) => {
        if (weight[b.Type] !== weight[a.Type]) {
          return weight[b.Type] - weight[a.Type];
        }
        return new Date(b.Timestamp) - new Date(a.Timestamp);
      })
      .slice(0, 10);

    console.log("Top 10 Priority Notifications:");
    console.table(top10);

  } catch (err) {
    console.log(err.message);
  }
}

getTop10Notifications();