const BREVO_API_KEY = "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";

async function testBrevo() {
  try {
    console.log("Sending request to Brevo SMTP...");
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: { name: "The Arts Folio Custom Forms", email: "info@theartsfolio.com" },
        to: [{ email: "info@theartsfolio.com", name: "The Arts Folio Admin" }],
        subject: "Test email from Brevo script",
        htmlContent: "<h3>This is a test email checking SMTP key validity and sender authorization.</h3>"
      })
    });

    console.log("Response status:", response.status, response.statusText);
    const body = await response.text();
    console.log("Response body:", body);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

testBrevo();
