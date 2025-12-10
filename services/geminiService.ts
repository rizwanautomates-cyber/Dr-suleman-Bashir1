import { GoogleGenAI } from "@google/genai";
import { DOCTOR_DATA } from "../constants";

// Initialize Gemini Client
const apiKey = process.env.API_KEY || ''; // Fallback for dev, though env is required
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are a helpful AI medical assistant for Dr. Suleman Bashir's clinic.
Clinic Details:
Name: ${DOCTOR_DATA.name}
Qualification: ${DOCTOR_DATA.qualification}
Specialization: ${DOCTOR_DATA.specialization}
Location: ${DOCTOR_DATA.address}
Timings: ${DOCTOR_DATA.timings}
Contact: ${DOCTOR_DATA.phoneMobile}

Your Role:
1. Answer general health questions briefly and advise users to book an appointment for serious concerns.
2. Provide information about clinic timings and location.
3. Be polite, professional, and concise.
4. If a user asks to book, guide them to the 'Book Now' tab in the app.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, my connection to the AI service is currently unavailable. Please contact the clinic directly.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};
