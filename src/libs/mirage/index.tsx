import faker from 'faker';
import axios from 'axios';
import { ActiveModelSerializer, createServer, Factory, Model } from 'miragejs';

interface Ticket {
  title: string;
  user_name: string;
  user_created_at: string;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  priority: string;
}

const priorities = ['high', 'normal', 'low'];

export const mirageApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      ticket: Model.extend<Partial<Ticket>>({}),
    },

    factories: {
      ticket: Factory.extend({
        title() {
          return faker.lorem.words(4);
        },
        user_name() {
          const firstName = faker.name.firstName();
          const lastName = faker.name.lastName();
          return `${firstName} ${lastName}`;
        },
        user_created_at() {
          return new Date().toString();
        },
        created_at() {
          return new Date().toString();
        },
        updated_at() {
          return new Date().toString();
        },
        avatar_url() {
          return faker.image.avatar();
        },
        priority() {
          const index = faker.datatype.number(2);

          return priorities[index];
        },
      }),
    },

    seeds(server) {
      server.createList('ticket', 500);
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/tickets');

      this.namespace = '';
      this.passthrough();
    },
  });

  return { server };
}
