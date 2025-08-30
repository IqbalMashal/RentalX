import request, { gql } from "graphql-request";

const MASTER_URL = process.env.NEXT_PUBLIC_MASTER_URL;

// Debug: Log the URL to make sure it's complete
const HYGRAPH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN; // Add this to your .env file

/**
 * Fetches the list of cars from the GraphQL API.
 */
export const getCarsList = async () => {
  const query = gql`
    query CarLists {
      carLists {
        id
        name
        price
        publishedAt
        updatedAt
        seat
        image {
          url
        }
        carType
        carBrand
        carAvg
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export const getStoreLocations = async () => {
  const query = gql`
    query storeLocation {
      storesLocation {
        address
      }
    }  
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

// Updated createBooking - matching the working playground version
export const createBooking = async (formValue) => {
  try {
    const mutationQuery = gql`
      mutation CreateBooking(
        $userName: String!
        $pickUpDate: String!
        $pickUpTime: String!
        $dropOffDate: String!
        $dropOffTime: String!
        $contactNumber: String!
        $carId: ID!
      ) {
        createBooking(
          data: {
            userName: $userName
            pickUpDate: $pickUpDate
            pickUpTime: $pickUpTime
            dropOffDate: $dropOffDate
            dropOffTime: $dropOffTime
            contactNumber: $contactNumber
            carId: { connect: { id: $carId } }
          }
        ) {
          id
          userName
          contactNumber
          pickUpDate
          dropOffDate
        }
      }
    `;
    
    const variables = {
      userName: formValue.userName,
      pickUpDate: formValue.pickUpDate,
      pickUpTime: formValue.pickUpTime,
      dropOffDate: formValue.dropOffDate,
      dropOffTime: formValue.dropOffTime,
      contactNumber: formValue.contactNumber, // Keep as string
      carId: formValue.carId
    };

    // Headers with authentication
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add authentication token if available
    if (HYGRAPH_TOKEN) {
      headers['Authorization'] = `Bearer ${HYGRAPH_TOKEN}`;
    }
    
    const result = await request(MASTER_URL, mutationQuery, variables, headers);
    return result;
  } catch (error) {
    console.error('Hygraph Booking Error:', error);
    
    // More detailed error logging
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.status, error.response.errors);
    }
    
    throw error;
  }
};