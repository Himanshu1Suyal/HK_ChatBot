class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const msg = message.toLowerCase();

    if (msg.includes("service")) {
      this.actionProvider.handleServices();
    } else if (msg.includes("price")) {
      this.actionProvider.handlePricing();
    } else if (msg.includes("book")) {
      this.actionProvider.handleBooking();
    }else {
      // ✅ Default response for ANY unknown input
      this.actionProvider.handleAIResponse(message);
    }
  }
}

export default MessageParser;