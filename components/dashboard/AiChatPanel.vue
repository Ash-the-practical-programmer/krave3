<template>
    <div
      class="fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out bg-base-200 shadow-[0_-4px_12px_-1px_rgba(0,0,0,0.1)]"
      :class="isOpen ? 'h-80 md:h-96' : 'h-14 cursor-pointer'"
      @click.self="!isOpen ? toggleChat() : null"
    >
      <div class="container mx-auto h-full flex flex-col">
        <!-- Header -->
        <div
          class="flex items-center justify-between p-3 border-b border-base-300"
          :class="{ 'cursor-pointer': !isOpen }"
          @click="toggleChat"
        >
          <div class="flex items-center">
            <CommonAppLogo class="h-6 w-auto mr-2" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-primary mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <h3 class="font-semibold text-base-content">AI Bio-Assistant</h3>
          </div>
          <button class="btn btn-ghost btn-sm btn-circle">
            <svg
              v-if="!isOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
  
        <!-- Chat Content Area -->
        <div
          v-if="isOpen"
          ref="chatMessagesContainer"
          class="flex-grow p-4 overflow-y-auto flex flex-col space-y-3"
        >
          <!-- Iterate through messages -->
          <div
            v-for="(m, msgIndex) in messages"
            :key="m.id || `msg-${msgIndex}`"
            class="chat chat-start"
          >
            <div
              class="chat-bubble text-sm pl-2 pr-2 overflow-hidden chat-bubble-secondary"
            >
              <!-- Handle both string and array content -->
              <template v-if="Array.isArray(m.content)">
                <span v-for="(part, partIndex) in m.content" :key="`part-${partIndex}`">
                  <span v-if="part.type === 'text'">{{ part.text }}</span>
                  <!-- Add handlers for other part types (e.g., images) if needed -->
                </span>
              </template>
              <span v-else>{{ m.content }}</span>
            </div>
          </div>
  
          <!-- Loading Indicator -->
          <div v-if="isLoading" class="chat chat-start">
            <div class="chat-bubble chat-bubble-secondary">
              <span class="loading loading-dots loading-md"></span>
            </div>
          </div>
        </div>
  
        <!-- Input Area -->
        <div v-if="isOpen" class="p-3 border-t border-base-300 flex justify-center items-center">
          <form @submit.prevent="handleSubmit" class="flex w-[80%] sm:w-[90%] items-center gap-2">
            <input
              type="text"
              v-model="input"
              placeholder="Ask about your bio-data..."
              class="input border-blue-500 focus:outline-none input-sm flex-grow"
              :disabled="isLoading"
            />
            <button
              type="submit"
              class="btn btn-primary btn-sm p-1.5"
              :disabled="!input.trim() || isLoading"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { CommonAppLogo } from '#components';
  import { useChat } from '@ai-sdk/vue';
import { ref, watch, nextTick } from 'vue';
  
  const isOpen = ref(false);
  const chatMessagesContainer = ref<HTMLElement | null>(null);
  
  // Initialize the useChat hook
const { messages, input, handleSubmit, isLoading, error, setMessages } = useChat();
  
  // Set initial message if none exist
  if (messages.value.length === 0) {
    setMessages([
      {
        id: 'initial-ai-greeting',
        role: 'assistant',
        content: 'Hello! How can I help you analyze your bio-data today?',
      },
    ]);
  }
  
  // Toggle chat visibility
  const toggleChat = () => {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      scrollToBottom();
    }
  };
  
  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    nextTick(() => {
      if (chatMessagesContainer.value) {
        chatMessagesContainer.value.scrollTop = chatMessagesContainer.value.scrollHeight;
      }
    });
  };
  
  // Watch messages for updates and scroll
  watch(messages, scrollToBottom, { deep: true });
  
  // Handle errors
  watch(error, (newError) => {
    if (newError) {
      console.error('AI Chat Error:', newError);
      setMessages([
        ...messages.value,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `Sorry, an error occurred: ${newError.message || 'Please try again.'}`,
        },
      ]);
    }
  });
  </script>