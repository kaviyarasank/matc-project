import axios from 'axios';

const API = {
  GetChatbotResponse: async (message: string) => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        if (message === 'hi') resolve('Welcome to chatbot!');
        else {
          const options = {
            method: 'GET',
            url: 'https://ai-chatbot.p.rapidapi.com/chat/free',
            params: { message: `${message}`, uid: 'user1' },
            headers: {
              'X-RapidAPI-Key': 'a08b46e4f2msh25a8dc2a3d14f2fp17daeajsna7b2bc642d72',
              'X-RapidAPI-Host': 'ai-chatbot.p.rapidapi.com'
            }
          };
          axios
            .request(options)
            .then(function (response) {
              resolve('Rolex Sir!' + `${' '}` + response.data?.chatbot?.response);
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      }, 2000);
    });
  }
};

export default API;
