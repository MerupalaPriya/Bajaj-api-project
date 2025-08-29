// /api/bfhl.js - Vercel Serverless Function
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ is_success: false, message: "Only POST /bfhl allowed" });
  }

  try {
    const body = req.body || {};
    const data = Array.isArray(body.data) ? body.data : [];

    const numbers = [];
    const alphabets = [];
    const specials = [];

    for (const item of data) {
      const s = String(item);
      if (/^\d+$/.test(s)) {
        numbers.push(s); // keep as string
      } else if (/^[a-zA-Z]+$/.test(s)) {
        alphabets.push(s.toUpperCase());
      } else {
        specials.push(s);
      }
    }

    const even_numbers = numbers.filter(n => parseInt(n) % 2 === 0);
    const odd_numbers  = numbers.filter(n => parseInt(n) % 2 !== 0);
    const total_sum    = numbers.reduce((acc, n) => acc + parseInt(n), 0).toString();

    // Concat alphabetical characters -> reverse -> alternating caps
    const combined = alphabets.join("");           // already uppercase
    const reversed = combined.split("").reverse().join("");
    let concat_string = "";
    for (let i = 0; i < reversed.length; i++) {
      concat_string += i % 2 === 0 ? reversed[i].toUpperCase() : reversed[i].toLowerCase();
    }

    const response = {
      is_success: true,
      user_id: "merupala_priya_01042005", // e.g., "john_doe_17091999" (lowercase)
      email: "merupala.priya2022@vitstudent.ac.in",
      roll_number: "22BCE0258",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters: specials,
      sum: total_sum,
      concat_string
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(200).json({ is_success: false, message: err.message });
  }
}
