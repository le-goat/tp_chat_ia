import {Injectable} from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor() {
    // Initialisez OpenAI avec votre clé d'API depuis l'environnement
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async translateMessage(
    message: string,
    targetLanguage: string,
  ): Promise<string> {
    // Utilisez l'API OpenAI pour traduire le message
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.2,
      messages: [
        {
          role: 'user',
          content: `Translate to ${targetLanguage} the following message : ${message}`,
        }
      ]
    });

    // Récupérez la traduction depuis la réponse de l'API
    return response.choices[0].message.content.trim();
  }


  async verifyMessage(
      message: string
  ):Promise<string> {
    const response = await this.openai.chat.completions.create(
        {
          model: 'gpt-3.5-turbo',
          temperature: 0.3,
          messages: [
            {
              role: 'user',
              content: `Check if the following message is right or wrong : ${message}`,
            }
          ]
        }
    )
    return response.choices[0].message.content.trim();
  }

  async proposedAnswers(
      message: string
  ):Promise<any> {
    const response = await this.openai.chat.completions.create(
        {
          model: 'gpt-3.5-turbo',
          temperature: 0.1,
          messages: [
            {
              role: 'user',
              content: `Give me three possible answer in the same language for the following message : ${message}. Respond only with the possible response in a JSON format array.`,
            }
          ]
        }
    )
    return response.choices[0].message.content.trim();
  }

}
