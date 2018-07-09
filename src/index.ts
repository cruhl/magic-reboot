import "cross-fetch/polyfill";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const order = [
  "West",
  "Living Room Lamp",
  "Fireplace Right",
  "Fireplace Left",
  "Recliner",
  "Loveseat",
  "Entry",
  "Counter Wall",
  "Counter Trash"
];

const duration = 4000;

const client = new ApolloClient({
  uri: "http://localhost:8080"
});

(async () => {
  const {
    data: { lights }
  } = await client.query<{
    lights: Array<{ id: string; name: string }>;
  }>({
    query: gql`
      {
        lights {
          id
          name
        }
      }
    `
  });

  setInterval(() => {
    order.forEach((lightName, index) => {
      const light = lights.find(({ name }) => lightName === name);

      if (!light) {
        return null;
      }

      setTimeout(async () => {
        await setLight(light.id, {
          color: "#ff0000",
          transition: duration
        });

        setTimeout(
          () =>
            setLight(light.id, {
              color: "#5400ff",
              transition: duration * 2
            }),
          duration
        );
      }, index * duration);
    });
  }, order.length * duration);
})();

const setLight = async (id: string, state: object) =>
  client.mutate({
    variables: { id, state: { ...state, on: true } },
    mutation: gql`
      mutation($id: ID!, $state: LightState!) {
        setLightState(id: $id, state: $state) {
          color
        }
      }
    `
  });
