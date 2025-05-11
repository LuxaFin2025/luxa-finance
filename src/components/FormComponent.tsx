import React from "react";

export default function FormComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <form className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
          Smart Entry Form
        </h2>

        {/* Input Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-black dark:text-white 
                       placeholder-gray-400 dark:placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-black dark:text-white 
                       placeholder-gray-400 dark:placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
          />
        </div>

        {/* Message Textarea */}
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Type your message here..."
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-black dark:text-white 
                       placeholder-gray-400 dark:placeholder-gray-500 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md 
                     transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
