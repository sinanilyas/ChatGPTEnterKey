// ==UserScript==
// @name          ChatGPT Enter Key
// @description   Customizes the Enter key behavior on chatgpt.com: Press Enter to insert a newline and Ctrl+Enter to send the message.
// @author        Sinan Ilyas
// @namespace     https://github.com/sinanilyas
// @version       1.0
// @grant         none
// @match         https://chatgpt.com/*
// ==/UserScript==

// @description   This script modifies the behavior of the Enter key on chatgpt.com to enhance message composition. 
//                By default, pressing Enter will insert a newline, allowing for better organization of thoughts. 
//                To send the message, press Ctrl+Enter, minimizing accidental submissions and enhancing user control.

(function() {
  'use strict';

  // Function to adjust textarea height based on content
  function adjustTextareaHeight() {
    promptTextArea.style.height = 'auto';
    promptTextArea.style.height = (promptTextArea.scrollHeight) + 'px';
  }
  
  // Function to handle the logic of adding newline on Enter
  function handleEnter(event) {
      if (event.key === "Enter") {
        if (!event.shiftKey && !event.ctrlKey)
        {
          this.value += "\n";
          adjustTextareaHeight();
          
          // Prevent submit
          event.stopPropagation();
          event.preventDefault();
          return false;
        }
        else if (event.ctrlKey)
        {
          return true;
        }
      }
  }
  
  // Apply the Enter key logic to the initial textarea
  let promptTextArea = document.querySelector('#prompt-textarea');
  if (promptTextArea) promptTextArea.addEventListener('keydown', handleEnter);

  // Watch for changes in the DOM using MutationObserver
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        // Check if the added node contains a textarea with id 'prompt-textarea'
        const textareas = node.querySelectorAll('textarea#prompt-textarea');
        textareas.forEach(function(textarea) {
          promptTextArea = textarea;
          textarea.addEventListener('keydown', handleEnter);
        });
      });
    });
  });

  // Configure and start the observer
  const observerConfig = { childList: true, subtree: true };
  observer.observe(document.body, observerConfig);
  
})();
