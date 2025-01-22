const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is correctly set
});

//summary
exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;

    // Correct method for OpenAI v4.x
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or you can use "gpt-4" if you have access to it
      messages: [{ role: "user", content: `Summarize this: ${text}` }],
    });

    // Extract the summary from the response
    const summary = response.choices[0]?.message?.content.trim();

    if (summary) {
      return res.status(200).json({ summary });
    } else {
      return res.status(500).json({ message: "Failed to generate summary" });
    }
  } catch (err) {
    console.error("Error in OpenAI API:", err.message);
    return res
      .status(500)
      .json({ message: "An error occurred", error: err.message });
  }
};

//paragraph
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;

    // Correct method for OpenAI v4.x
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // You can use "gpt-4" if you have access to it
      messages: [
        { role: "user", content: `Write a detailed paragraph about: ${text}` },
      ],
    });

    // Extract the paragraph from the response
    const paragraph = response.choices[0]?.message?.content.trim();

    if (paragraph) {
      return res.status(200).json({ paragraph });
    } else {
      return res.status(500).json({ message: "Failed to generate paragraph" });
    }
  } catch (err) {
    console.error("Error in OpenAI API:", err.message);
    return res
      .status(500)
      .json({ message: "An error occurred", error: err.message });
  }
};


// Chatbot Controller
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // Use "gpt-4" if you have access to it, otherwise use "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Answer question similar to how Yoda from Star Wars would. Me: '${text}'` },
      ],
    });

    const reply = response.choices[0]?.message?.content.trim();

    if (reply) {
      return res.status(200).json({ reply });
    } else {
      return res.status(500).json({ message: "Failed to generate response" });
    }
  } catch (err) {
    console.error("Error in OpenAI API:", err.message);
    return res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// JS Converter Controller
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // Use "gpt-4" if you have access to it
      messages: [
        { role: "system", content: "You are a coding assistant." },
        { role: "user", content: `Convert these instructions into JavaScript code: \n${text}` },
      ],
    });

    const jsCode = response.choices[0]?.message?.content.trim();

    if (jsCode) {
      return res.status(200).json({ jsCode });
    } else {
      return res.status(500).json({ message: "Failed to generate JavaScript code" });
    }
  } catch (err) {
    console.error("Error in OpenAI API:", err.message);
    return res.status(500).json({ message: "An error occurred", error: err.message });
  }
};



