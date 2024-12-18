import {gql, GraphQLClient} from "graphql-request";

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}`

const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        authorization: `Bearer ${process.env.CDA_TOKEN}`,
    },
})

export async function fetchResidents () {
  const query = gql`
  {
    artistCollection (limit: 150) {
      items {
        id
        name
        fullsize {
          url
        }
        description {
          json
        }
        showTitle
        showDescription {
          json
        }
        socialMedia
        programTime
        genreTags
      }
    }
  }
  `
  return graphQLClient.request(query)
}

export async function fetchResident (name) {
    const query = gql`
    query getResident($name: String!){
      artistCollection(where: {name: $name}) {
        items {
          id
          soundcloudEmbed
          name
          fullsize {
            url
          }
          description {
            json
          }
          showTitle
          showDescription {
            json
          }
          socialMedia
          programTime
          genreTags
        }
      }
    }
    `
    return graphQLClient.request(query, { name })
}

export async function fetchBlogs () {
  const query = gql`
  {
    blogPostCollection (limit: 20) {
      items {
        id
        title
        coverimage {
          url
        }
        blogContent {
          json
        }
        link
      }
    }
  }
  `
  return graphQLClient.request(query)
}

export async function fetchBlog (id) {
  const query = gql`
  query getBlogPost($id: String!){
    blogPostCollection(where: {id: $id}) {
      items {
        id
        title
        coverimage {
          url
        }
        blogContent {
          json
        }
        link
      }
    }
  }
  `
  return graphQLClient.request(query, { id })
}

export async function fetchAbout () {
  const query = gql`
  {
  aboutCollection {
    items {
      about {
        json
      }
    }
  }
}
`
  return graphQLClient.request(query)
}
