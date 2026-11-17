
export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("JARVIS ONLINE");
    }

    try {
      const data = await request.json();

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": env.GEMINI_API_KEY
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: data.question || "Hello Jarvis"
              }]
            }]
          })
        }
      );

      return new Response(await response.text(), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Jarvis connection failed" }),
        { status: 500 }
      );
    }
  }
};

