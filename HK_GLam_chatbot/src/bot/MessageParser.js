class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const msg = message.toLowerCase();

 // SERVICES
  if (
    msg.includes("service") ||
    msg.includes("services")
  ) {
    this.actionProvider.handleServices();
  }

  else if (
  msg.includes("Closes") ||
  msg.includes("Closed") ||
  msg.includes("closing")
) {

  const botMessage =
    this.actionProvider.createChatBotMessage(
      "We closed at 8 PM. Please contact us during our working hours for any assistance 😊"
    );

  this.actionProvider.updateChatbotState(botMessage);
}

  else if (
  msg.includes("instagram") ||
  msg.includes("insta") ||
  msg.includes("social media")
) {

  const botMessage =
    this.actionProvider.createChatBotMessage(
      "📸 Follow us on Instagram 👇\nhttps://www.instagram.com/hk_glam_studio/"
    );

  this.actionProvider.updateChatbotState(botMessage);
}

  // NEGOTIABLE  ← MOVE THIS ABOVE PRICING
  else if (
    msg.includes("negotiable") ||
    msg.includes("discount") ||
    msg.includes("offer")
  ) {

    const botMessage =
      this.actionProvider.createChatBotMessage(
        "Yes 😊 Prices are negotiable depending on the service and requirements. Please contact HK Glam Studio directly for the best thing you can have."
      );

    this.actionProvider.updateChatbotState(botMessage);
  }

  // PRICING
  else if (
    msg.includes("price") ||
    msg.includes("pricing") ||
    msg.includes("cost") ||
    msg.includes("rate")
  ) {
    this.actionProvider.handlePricing();
  }

  else if (
  msg.includes("map") ||
  msg.includes("location") ||
  msg.includes("google map")
) {

  const botMessage =
    this.actionProvider.createChatBotMessage(
      `📍 Find us on Google Maps 👇
      <a href="https://maps.app.goo.gl/HxVQucxyzBTHukhKA" target="_blank">
      Open Location
      </a>`,
      {
        withAvatar: true,
      }
    );

  this.actionProvider.updateChatbotState(botMessage);
}

  // BOOKING
  else if (
    msg.includes("book") ||
    msg.includes("appointment")
  ) {
    this.actionProvider.handleBooking();
  }

  // AI
  else {
    this.actionProvider.handleAIResponse(message);
  }
  }
}

export default MessageParser;