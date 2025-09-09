// Gemini AI API integration
// Uses Google AI Studio Gemini API

const GEMINI_API_KEY = "AIzaSyAx1a1Ay9auoKOhvKf3TVSl1XuVg5yUKGU";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;

export async function getGeminiResponse(messages) {
  // messages: [{role: 'user'|'model', parts: [{text: string}]}]
  const body = {
    contents: messages
  };
  const res = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Gemini API error');
  const data = await res.json();
  // Parse response
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return text;
}
