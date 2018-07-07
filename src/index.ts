import "cross-fetch/polyfill";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:8080"
});

const lights = [
  {
    id: "1",
    name: "Treadmill"
  },
  {
    id: "2",
    name: "Window"
  },
  {
    id: "3",
    name: "Office Lamp"
  },
  {
    id: "4",
    name: "Bathroom"
  },
  {
    id: "5",
    name: "Window"
  },
  {
    id: "6",
    name: "Living Room Lamp"
  },
  {
    id: "7",
    name: "Loveseat"
  },
  {
    id: "9",
    name: "Recliner"
  },
  {
    id: "11",
    name: "Fireplace Right"
  },
  {
    id: "12",
    name: "Counter Wall"
  },
  {
    id: "13",
    name: "Fireplace Left"
  },
  {
    id: "14",
    name: "Counter Trash"
  },
  {
    id: "15",
    name: "Strip"
  },
  {
    id: "16",
    name: "Desk"
  },
  {
    id: "17",
    name: "Wall"
  },
  {
    id: "18",
    name: "North"
  },
  {
    id: "19",
    name: "East"
  },
  {
    id: "20",
    name: "West"
  }
];

const order = [
  "West",
  "Living Room Lamp",
  "Fireplace Right",
  "Fireplace Left",
  "Recliner",
  "Loveseat",
  "Counter Wall",
  "Counter Trash"
];

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

const duration = 4000;

setInterval(async () => {
  order.forEach(async (lightName, index) => {
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
        async () =>
          setLight(light.id, {
            color: "#5400ff",
            transition: duration * 2
          }),
        duration
      );
    }, index * duration);
  });
}, order.length * duration);
