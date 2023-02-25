const { default: axios, Axios, HttpStatusCode } = require("axios");
/**
 * Send raw address text to Feeds API
 * @param {String} address 
 * @param {Object} extraParameters 
 */
const eventsService = async (address, extraParameters) => {

  const response = {
    'feeds': [
      {
        "raw_text": address,
        "channel": "discord",
        "extra-parameters": extraParameters,
        "epoch": Date.now()
      }
    ]
  }

  const Url = `${process.env.BACKEND_GO_API_URL}/events`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "x-api-key": process.env.BACKEND_GO_API_KEY
    },
    data: JSON.stringify(response),
    url: Url,
  };
  try {
    const response = await axios(options);
    console.log(1)
    if (response.status === HttpStatusCode.Ok) {
      console.log("posted")
    }

  } catch (error) {
    console.log(error.response?.status||error)
  }
}

module.exports = {
  eventsService
};

