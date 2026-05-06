class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleServices = () => {
    const message = this.createChatBotMessage("Below are our services 💄", {
      widget: "servicesList",
    });
    this.updateChatbotState(message);
  };

  handlePricing = () => {
    const message = this.createChatBotMessage("Here is our pricing 💄", {
      widget: "pricingList",
    });

    this.updateChatbotState(message);
  };

    handleBooking = () => {
    const message = this.createChatBotMessage(
      "Click below to book your appointment 👇",
      {
        widget: "bookingLink",
      }
    );

    this.updateChatbotState(message);
  };

handleAIResponse = async (userMessage) => {
  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();

    const message = this.createChatBotMessage(data.reply);
    this.updateChatbotState(message);
  } catch (error) {
    const message = this.createChatBotMessage(
      "Sorry, something went wrong."
    );
    this.updateChatbotState(message);
  }
};

  updateChatbotState(message) {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;