import {gql, GraphQLClient} from "graphql-request";

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}`

const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        authorization: `Bearer ${process.env.CDA_TOKEN}`,
    },
})

export async function residents () {
    const query = gql`
  {
  artistCollection {
    items {
      id
      name
      fullsize {
        url
      }
      description {
        json
      }
    }
  }
}
`
    return graphQLClient.request(query)
}

export async function residentsNames () {
    const query = gql`
  {
  artistCollection {
    items {
      name
    }
  }
}
`
    return graphQLClient.request(query)
}

export async function residentsImages () {
    const query = gql`
  {
  artistCollection {
    items {
      fullsize {
        url
      }
    }
  }
}
`
    return graphQLClient.request(query)
}

export async function resident (name) {
    const query = gql`
  query getResident($name: String!){
  artistCollection(where: {name: $name}) {
    items {
      id
      name
      fullsize {
        url
      }
      description {
        json
      }
    }
  }
}
`

    return graphQLClient.request(query, { name })
}