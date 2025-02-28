import request, { gql } from "graphql-request";

const MASTER_URL = process.env.NEXT_PUBLIC_MASTER_URL;

/**
 * Fetches the list of cars from the GraphQL API.
 * @returns {Promise<Object>} The result of the GraphQL query containing the list of cars.
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
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};


export const getStoreLocations=async()=>{
  const query=gql`
  query storeLocation {
    storesLocations {
      address
    }
  }  
  `
  const result=await request(MASTER_URL,query);
  return result;
}


export const createBooking=async(formValue)=>{
  const mutationQuery=gql`
  mutation MyMutation {
    createBooking(
      data:  {userName: "`+formValue.userName+`", 
      pickUpDate: "`+formValue.pickUpDate+`", 
      pickUpTime: "`+formValue.pickUpTime+`", 
      dropOffDate: "`+formValue.dropOffDate+`", 
      dropOffTime: "`+formValue.dropOffTime+`", 
      contactNumber: "`+formValue.contactNumber+`", 
      carId: {connect: 
        {id: "`+formValue.carId+`"}}}
    ) {
      id
    }
  }
  
  `

  const result=await request(MASTER_URL,mutationQuery);
  return result;
}