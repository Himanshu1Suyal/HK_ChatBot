import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import BookingLink from "./BookingLink";

const config = {
  initialMessages: [
    createChatBotMessage("Hi 👋 Welcome to HK Glam Studio 💄"),
    createChatBotMessage("How can I help you?", {
      widget: "options",
    }),
  ],

  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => (
        <div className="d-flex flex-column gap-2 mt-2">
          <button 
            className="btn btn-outline-dark rounded-pill"
            onClick={() => props.actionProvider.handleServices()}
          >
            ✂️ Services
          </button>

          <button 
            className="btn btn-outline-primary rounded-pill"
            onClick={() => props.actionProvider.handlePricing()}
          >
            💰 Pricing
          </button>

          <button 
            className="btn btn-dark rounded-pill"
            onClick={() => window.open("https://www.hkglamstudio.com", "_blank")}
          >
            📅 Book Appointment
          </button>
        </div>
      ),
    },

    {
      widgetName: "servicesList",
      widgetFunc: () => (
        <div style={{ textAlign: "left" }}>
          <ul style={{ paddingLeft: "20px" }}>
            <li>✂️ Haircut</li>
            <li>🌿 Facial</li>
            <li>💃 Bridal Makeup</li>
            <li>💃 Party Makeup</li>
            <li>💅 Nail Art</li>
            <li>✨ Smoothing</li>
            <li>✨ Keratin</li>
          </ul>
        </div>
      ),
    },

    {
      widgetName: "pricingList",
      widgetFunc: () => (
        <div style={{ textAlign: "left" }}>
          <ul style={{ paddingLeft: "20px" }}>
            <li>✂️ Haircut: ₹300</li>
            <li>🌿 Facial: ₹500 onwards</li>
            <li>💃 Party Makeup: ₹1500 onwards</li>
            <li>💅 Nail Art: ₹700 onwards</li>
            <li>✨ Smoothing: ₹2000 onwards</li>
          </ul>
        </div>
      ),
    },

    {
      widgetName: "bookingLink",
      widgetFunc: () => <BookingLink />,
    },
  ],
};

export default config;