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
   const botMessage = this.actionProvider.createChatBotMessage(
    "📸 You can visit our Instagram page 👇",
    {
      widget: "instagramLink",
    }
  );

  this.actionProvider.updateChatbotState(botMessage);
   return; // IMPORTANT
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

    else if (
      msg.includes("website") ||
      msg.includes("web") ||
      msg.includes("site")
    ) {

      const botMessage =
        this.actionProvider.createChatBotMessage(
          "🌐 Visit our official website 👇",
          {
            widget: "websiteLink",
          }
        );

      this.actionProvider.updateChatbotState(botMessage);

      return;
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

  const message = this.actionProvider.createChatBotMessage(
    "📍 Find us on Google Maps 👇",
    {
      widget: "googleMapLink",
    }
  );

  this.actionProvider.updateChatbotState(message);

  return; // IMPORTANT
}

  // BOOKING
  else if (
    msg.includes("book") ||
    msg.includes("appointment")
  ) {
    this.actionProvider.handleBooking();
  }

  // Location
if (
  msg.includes("location") ||
  msg.includes("address") ||
  msg.includes("where is") ||
  msg.includes("where are you") ||
  msg.includes("salon")
) {

  const message = this.actionProvider.createChatBotMessage(
    "📍 HK Glam Studio is located in Dhandera, Roorkee.\n🕒 Timings: 11 AM to 8 PM"
  );

  this.actionProvider.updateChatbotState(message);

  return;
}

  // AI
  else {
    this.actionProvider.handleAIResponse(message);
  }
  }
}

export default MessageParser;