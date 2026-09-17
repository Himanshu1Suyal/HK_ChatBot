import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage("Hi 👋 Welcome to HK Glam Studio 💄"),
    createChatBotMessage("How can I help you?", {
      widget: "options",
    }),
  ],
  
  // ADD THIS SECTION
  customComponents: {
    botChatMessage: (props) => (
      <div
        className="react-chatbot-kit-chat-bot-message"
        dangerouslySetInnerHTML={{ __html: props.message }}
      />
    ),
  },

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
            onClick={() => props.actionProvider.handleBooking()}
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
            <li>👰 Bridal Makeup</li>
            <li>💃 Party Makeup</li>
            <li>💅 Nail Art</li>
            <li>✨ Smoothing</li>
            <li>🌟 Keratin</li>
            <li>✨ Botox</li>
            <li>💇 Hairstyle</li>
            <li>🧴 Full body Wax</li>
            <li>🦵 Half Legs wax</li>
            <li>🎨 Hair colour</li>
            <li>✨ Hair Root touchup</li>
            <li>💫 KeraSmooth</li>
            <li>✨ Threading</li>

          </ul>
        </div>
      ),
    },

    {
      widgetName: "googleMapLink",
      widgetFunc: () => (
        <div>
          <a
            href="https://maps.app.goo.gl/HxVQucxyzBTHukhKA"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#110f0f",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Click here to open location
          </a>
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
            <li>👰 Bridal Makeup: ₹6000 onwards</li>
            <li>💃 Party Makeup: ₹1500 onwards</li>
            <li>💅 Nail Art: ₹700 onwards</li>
            <li>✨ Smoothing: ₹2000 onwards</li>
            <li>🌟 Keratin: ₹1999 owards</li>
            <li>✨ Botox 2499 onwards</li>
            <li>💇 Hairstyle 500</li>
            <li>🧴 Full body Wax 2500</li>
            <li>🦵 Half Legs wax 300</li>
            <li>🎨 Hair colour 2000</li>
            <li>✨ Hair Root touchup 500</li>
            <li>💫 KeraSmooth 2000 onwards</li>
            <li>✨ Threading 30</li>
          </ul>
        </div>
      ),
    },

    {
      widgetName: "instagramLink",
      widgetFunc: () => (
        <div>
          <a
            href="https://www.instagram.com/hk_glam_studio/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0f0e0e",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Click here to visit our Instagram
          </a>
        </div>
      ),
    },

    {
      widgetName: "websiteLink",
      widgetFunc: () => (
        <div>
          <a
            href="https://www.hkglamstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0f0e0e",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Click here to open the website
          </a>
        </div>
      ),
    },
  ],
};

export default config;