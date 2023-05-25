import fetch from "node-fetch";
import {colorToEmoji} from '../utils'
import {TickerItemType} from "../../../types";

const normalized = (data: Map<string, TickerItemType>) => {
  let normalizedString: string;
  for (const [key, value] of data) {
    if (!normalizedString) {
      normalizedString = `${key}: ${value.price}`;  
    } else {
      normalizedString = `${normalizedString}, ${key}: ${value.price}`;
    }
  }
  console.log({normalizedString});
  return normalizedString;
}

export const sendMessage = async (status: string, template: string, data: Map<string, TickerItemType>) => {
  const url = "https://graph.facebook.com/v16.0/106205829141641/messages";
  const accessToken = process.env.FB_ACCESS_TOKEN;
  const bodyData = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "972544987877",
    type: "text",
    text: {
       'preview_url': false,
       'body': `${template} ${status} ${colorToEmoji(status)}. ${normalized(data)}`
    },
  };

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data
      console.log('handle whatsapp', data);
        console.log({ whatsappDatap: JSON.stringify(data) });
    })
    .catch((error) => {
      // Handle errors
      console.log('handle whatsapp error', error);
      console.log({ error });
    });
};
