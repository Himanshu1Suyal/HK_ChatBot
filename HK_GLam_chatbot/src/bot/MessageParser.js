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